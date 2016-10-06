/**
 * Created by Warlock on 02.10.2016.
 */

import {AudioInspector} from "./audio.inspector";
import {AudioSlicer} from "./audio.slicer";
import {Subject}    from 'rxjs/Subject';

export class FileLoadedMessage {
    constructor(ab:AudioBuffer) {
    }
}

export class FileRenderedMessage {
    constructor(renderedBuffer:AudioBuffer) {
    }
}

export class FileRenderProgressMessage {
    constructor(progress:number) {
    }
}

export class FileProcessingErrorMessage {
    constructor(error:string) {
    }
}

// AudioWrapper
//
//  This class wraps binary audio file and provides some methods to manipulate it.
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
export class AudioWrapper {
    // ************
    // .ctor
    // ************

    constructor(source:File) {
        this._source = source;
        let fileReader = new FileReader();

        // create the AudioContext instance for extracting audio data
        this.context = new AudioContext();

        fileReader.readAsArrayBuffer(this._source);
        fileReader.onloadend = (event:any) => {
            this.context.decodeAudioData(event.target.result, (ab:AudioBuffer)=> {
                // send message, that AudioBuffer was loaded:
                this.fileProcessingSource.next(new FileLoadedMessage(ab));

                // create offline audio context to further processing audio:
                this.offlineContext = new OfflineAudioContext(ab.numberOfChannels, ab.duration * ab.sampleRate, ab.sampleRate);

                this.audioBufferSource = this.offlineContext.createBufferSource();
                this.audioBufferSource.buffer = ab;
                this.audioBufferSource.connect(this.offlineContext.destination);
                this.audioBufferSource.start();

                // ToDO: convert OfflineAudioBuffer to any because TS don't have definition needed methods.
                let oac:any = this.offlineContext;

                // listen onstatechange in oder to send current progress sometime:
                oac.onstatechange = (event) => {
                    if (oac.state === 'suspended') {
                        console.log('suspended at = ' + oac.currentTime + ' duration: ' + ab.duration);
                        oac.suspend(oac.currentTime + 0.1);
                        oac.resume();

                        //send message with current progress:
                        this.fileProcessingSource.next(new FileRenderProgressMessage(oac.currentTime * 100 / ab.duration));
                    }
                };

                oac.suspend(0.1);

                // rendered audio file to offline buffer:
                this.offlineContext.startRendering().then((renderedBuffer)=> {
                    // send message, that audio was rendered to offline buffer (and attach rendered data):
                    this.fileProcessingSource.next(new FileRenderedMessage(renderedBuffer));

                    this.renderedBuffer = renderedBuffer
                });


            })
        }
    }

    // ************
    // Fields
    // ************

    private context:AudioContext;
    private offlineContext:OfflineAudioContext;
    private audioBufferSource:AudioBufferSourceNode;
    private renderedBuffer:AudioBuffer = null;
    private song:AudioBufferSourceNode;

    private _inspector:AudioInspector;
    get inspector():AudioInspector {
        return this._inspector;
    }

    private _slicer:AudioSlicer;
    get slicer():AudioSlicer {
        return this._slicer;
    }

    private _source:File;
    get source():File {
        return this._source;
    }

    // ************
    // Events
    // ************

    private fileProcessingSource = new Subject<any>();
    fileProcessing$ = this.fileProcessingSource.asObservable();

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
        this.song.start()
    }

    pause() {
        this.song.stop();
        this.song.disconnect(this.context.destination);
        this.song = null;
    }
}
