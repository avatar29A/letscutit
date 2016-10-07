/**
 * Created by Warlock on 02.10.2016.
 */

/*
 AudioSlicer provides methods for breaking file on parts.
 */
export class AudioSlicer {
    private _context:AudioContext;
    private _audioSource:MediaElementAudioSourceNode;

    constructor(context:AudioContext, source:MediaElementAudioSourceNode) {
        this._audioSource = source;
        this._context = context;
    }
}