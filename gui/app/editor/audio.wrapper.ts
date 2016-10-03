import {AudioInspector} from "./audio.inspector";
import {AudioSlicer} from "./audio.slicer";
/**
 * Created by Warlock on 02.10.2016.
 */

export class AudioWrapper {
    private _context:AudioContext;
    private _offlineContext:OfflineAudioContext;
    private _audioBufferSource:AudioBufferSourceNode;
    private _renderedBuffer:AudioBuffer = null;
    private _song:AudioBufferSourceNode;
    private _gain:GainNode; // a volume manager

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

    constructor(source:File) {
        this._source = source;
        let fileReader = new FileReader();

        // create the AudioContext instance for extracting audio data
        this._context = new AudioContext();

        fileReader.readAsArrayBuffer(this._source);
        fileReader.onloadend = (event:any) => {
            this._context.decodeAudioData(event.target.result, (ab)=> {
                this._offlineContext = new OfflineAudioContext(ab.numberOfChannels, ab.duration * ab.sampleRate, ab.sampleRate);
                this._audioBufferSource = this._offlineContext.createBufferSource();
                this._audioBufferSource.buffer = ab;
                this._audioBufferSource.connect(this._offlineContext.destination);
                this._audioBufferSource.start();

                this._offlineContext.startRendering().then((renderedBuffer)=> this._renderedBuffer = renderedBuffer);
            })
        }
    }

    play() {
        if (this._song != null) {
            this.pause()
        }

        this._song = this._context.createBufferSource();
        this._song.buffer = this._renderedBuffer;

        this._song.connect(this._context.destination);
        this._song.start()
    }

    pause() {
        this._song.stop();
        this._song.disconnect(this._context.destination);
        this._song = null;
    }

    onUpdate(handler:any) {

    }
}
