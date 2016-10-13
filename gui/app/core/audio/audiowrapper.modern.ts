/**
 * Created by Warlock on 02.10.2016.
 */
import {Subject}    from 'rxjs/Subject';
import {IAudioWrapper} from "./audiowrapper.abstract";
import {Observable} from "rxjs/Rx";
import Timer = NodeJS.Timer;

// AudioWrapper
//
//  This class wraps binary audio file and provides some methods to manipulate it.
//
//  This implementation based on Web Audio API features. Today this API is supported only a few modern browsers.
//
//  Opportunities:
//      * Extract PCM
//      * Extract Frequency and Timing
//      * Make slices
//      * Play as whole file as and a sliced part
//
//  Also this class provides further interface to emit events:
//
//      fileProcessing$
//  User could subscribe on this, and will await further messages:
//      * FileLoadedMessage - file was loaded
//      * FileRenderedMessage - file was rendered. Also contains rendered data
//      * FileProcessingErrorMessage - if file's processing was aborted, emit this message with error message.
//
//    Note: The current implementation founded on Web Audio API features. Today this API is supported a few modern browsers.

export class ModernAudioWrapper implements IAudioWrapper {
    // ************
    // Fields
    // ************

    private context: AudioContext;
    private offlineContext: OfflineAudioContext;
    private audioBufferSource: AudioBufferSourceNode;
    private renderedBuffer: AudioBuffer = null;
    private song: AudioBufferSourceNode;
    private playedTime: number = 0;

    private _source: File;
    get source(): File {
        return this._source;
    }


    // ************
    // .ctor
    // ************

    constructor(source: File) {
        this._source = source;
        let fileReader = new FileReader();

        // create the AudioContext instance for extracting audio data
        this.context = new AudioContext();

        fileReader.readAsArrayBuffer(this._source);
        fileReader.onloadend = this.onFileLoaded.bind(this);
    }

    //onFileLoaded invokes processing, after file was loaded.
    private onFileLoaded(event: any): void {
        this.context.decodeAudioData(event.target.result,
            this.onDecodedSuccessfull.bind(this),
            this.onDecodedError.bind(this));
    }

    //onDecodedSuccessfull invokes after file was successfully decoded.
    //Otherwise will be invoked onDecodedError method.
    private onDecodedSuccessfull(ab: AudioBuffer): void {
        // send message, that AudioBuffer was loaded:
        this.fileProcessingSource.next(new FileLoadedMessage(ab));

        // create offline audio context to further processing audio:
        this.offlineContext = new OfflineAudioContext(ab.numberOfChannels, ab.duration * ab.sampleRate, ab.sampleRate);

        this.audioBufferSource = this.offlineContext.createBufferSource();
        this.audioBufferSource.buffer = ab;
        this.audioBufferSource.connect(this.offlineContext.destination);
        this.audioBufferSource.start();

        //!Experimental feature:
        this.startListeningProgress(this.offlineContext, ab);

        // rendered audio file to offline buffer:
        this.offlineContext.startRendering().then((renderedBuffer: AudioBuffer)=> {
            // send message, that audio was rendered to offline buffer (and attach rendered data):
            this.fileProcessingSource.next(new FileRenderedMessage(renderedBuffer));
            this.renderedBuffer = renderedBuffer
        });
    }

    // Subsribe on event onstatechange and await then hope pause,
    // send message with current progress state and resume rendering.
    //
    // Notes: It uses experimental Audio API, and is not supported in any browsers except Chrome(49 or above).
    // For other browsers we need to use 'hack' which just run animate progress without binding to real state.
    //
    // Also we got OfflineAudioContext without strong typing, because TS there aren't appropriate type definitions and
    // say that onstatechange, resume and suspend are absent.
    private startListeningProgress(oac: any, ab: AudioBuffer) {
        // listen onstatechange in oder to send current progress sometime:
        oac.onstatechange = (event) => {
            if (oac.state === 'suspended') {
                if (oac.destination >= oac.currentTime + 0.1) {
                    oac.suspend(oac.currentTime + 0.1);
                }

                oac.resume();

                //send message with current progress:
                this.fileProcessingSource.next(new FileRenderProgressMessage(oac.currentTime * 100 / ab.duration));
            }
        };

        // Set rendering on pause, then invoke callback 'onstatechange' and will send message with a current
        // rendering progress:
        oac.suspend(0.1);
    }

    //onDecodedError invokes if file decoding was aborted.
    private onDecodedError(error): void {
        this.fileProcessingSource.next(new FileProcessingErrorMessage(error));
    }

    // ************
    // Events
    // ************

    private fileProcessingSource = new Subject<any>();
    fileProcessing$: Observable<any> = this.fileProcessingSource.asObservable();

    // ************
    // Methods
    // ************

    play() {
        if (this.song != null) {
            this.pause()
        }

        this.song = this.context.createBufferSource();
        this.song.buffer = this.renderedBuffer;

        this.song.connect(this.context.destination);

        this.startPlayback();
    }

    pause() {
        this.song.stop();
        this.song = null;
    }

    startPlayback() {
        this.playedTime = 0;
        this.song.start();
    }
}

//========================================
//              Messages
// ========================================

export class FileLoadedMessage {
    constructor(public ab: AudioBuffer) {
    }
}

export class FileRenderedMessage {
    constructor(public renderedBuffer: AudioBuffer) {
    }
}

export class FileRenderProgressMessage {
    constructor(public progress: number) {
    }
}

export class FileProcessingErrorMessage {
    constructor(public error: any) {
    }
}

export class FilePlayedMessage {
    constructor(public currentTime: number) {

    }
}
