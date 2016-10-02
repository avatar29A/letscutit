import {AudioInspector} from "./audio.inspector";
import {AudioSlicer} from "./audio.slicer";
/**
 * Created by Warlock on 02.10.2016.
 */

export class AudioWrapper {
    private _context:AudioContext;
    private _audioSource:MediaElementAudioSourceNode;

    private _fileURL:string;
    private _audioElement:HTMLMediaElement;
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

        // create the AudioContext instance for extracting audio data
        this._context = new AudioContext();

        // Get url for File
        this._fileURL = URL.createObjectURL(source);

        //get audio element
        this._audioElement = <HTMLMediaElement>document.getElementById("audio");
        this._audioElement.src = this._fileURL;

        this._audioSource = this._context.createMediaElementSource(this._audioElement);

        // make helpers
        this._inspector = new AudioInspector(this._context, this._audioSource);
        this._slicer = new AudioSlicer(this._context, this._audioSource);

        // create instance of GainNode
        this._gain = this._context.createGain();
        this._audioSource.connect(this._gain);

        this._gain.connect(this._context.destination);
    }

    play() {
        this._audioElement.play();
    }

    pause() {
        this._audioElement.pause()
    }

    onUpdate(handler:Function) {
        this._audioElement.addEventListener("timeupdate", handler);
    }
}
