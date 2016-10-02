/**
 * Created by Warlock on 01.10.2016.
 */

/*
 AudioInspector provides methods for extract a file metadata.
 */
export class AudioInspector {
    private _context:AudioContext;
    private _audioSource:MediaElementAudioSourceNode;
    private _analyser:AnalyserNode;

    constructor(context:AudioContext, source:MediaElementAudioSourceNode) {
        this._audioSource = source;
        this._context = context;

        // create the AnalyzerNode
        this._analyser = this._context.createAnalyser();
        this._audioSource.connect(this._analyser);
    }

    getTimeDomainData():Uint8Array {
        this._analyser.fftSize = 2048;
        let dataArray = new Uint8Array(this._analyser.fftSize);
        this._analyser.getByteTimeDomainData(dataArray);

        return dataArray;
    }

    getFrequencyData():Uint8Array {
        this._analyser.fftSize = 256;
        let bufferLength = this._analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        this._analyser.getByteFrequencyData(dataArray);

        return dataArray;
    }
}