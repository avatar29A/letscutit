/**
 * Created by bglebov on 13.10.2016.
 */

import {IAudioWrapper} from "./audiowrapper.abstract";
import {Observable, Subject} from "rxjs/Rx";
import {Aurora, AuroraAudioBuffer, AssetProxy, PlayerProxy} from "../aurora.proxy";
import {
    FileLoadedMessage, FileRenderedMessage, FileProcessingErrorMessage,
    FileRenderProgressMessage, FilePlayedMessage, 
    AudioPlayMessage, AudioStopMessage, AuidoPauseMessage
} from "./audio.messages";

/*
 AuroraAudioWrapper
 */
export class AuroraAudioWrapper implements IAudioWrapper {
    // ************
    // Fields
    // ************
    private _source: File;
    private av: Aurora = new Aurora();
    private asset: AssetProxy;
    private player: PlayerProxy = null;
    private lastCurrentTime: number = 0;
    private externalProgressCallback: (progress: number) => void = null;

    // ************
    // .ctor
    // ************
    constructor(source: File) {
        this._source = source;
        this.extractPCM(source);
    }

    // ************
    // Properties
    // ************
    get source(): File {
        return this._source;
    }

    // ************
    // Events
    // ************

    private fileProcessingSource = new Subject<any>();
    fileProcessing$: Observable<any> = this.fileProcessingSource.asObservable();

    // ************
    // Methods
    // ************

    play(): void {
        if (this.player == null) {
            this.player = this.av.Player.fromFile(this.source);
            this.player.on("progress", this.onProgress.bind(this));
        }

        this.fileProcessingSource.next(new AudioPlayMessage());
        this.player.play();
    }

    pause(): void {
        this.fileProcessingSource.next(new AuidoPauseMessage());
        this.player.pause();
    }

    stop(): void {
        this.fileProcessingSource.next(new AudioStopMessage());
        this.player.stop();
    }

    // ************
    // Private Methods
    // ************

    // extractPCM extracts PCM signal and send message to fileProcessingSource. 
    // Sends instance of FileRenderedMessage.  
    private extractPCM(file: File): void {
        this.asset = this.av.Asset.fromFile(file);
        this.asset.decodeToBuffer(this.onExtractedPCM.bind(this));
        this.asset.on("buffer", this.onBuffer.bind(this));
    }

    // handler for callback decodeToBuffer from Asset
    // invoke when whole audio stream will be decoded
    private onExtractedPCM(pcmdata: Float32Array): void {
        let audioBuffer = AuroraAudioBuffer.fromArray(pcmdata);
        audioBuffer.attachAsset(this.asset);

        this.fileProcessingSource.next(new FileRenderedMessage(audioBuffer));
    }

    // handler for event progress (Aurora's Player).
    private onProgress(progress: number): void {
        let currentTime = this.player.currentTime / 1000;
        this.fileProcessingSource.next(new FilePlayedMessage(currentTime));
    }

    private onBuffer(progress: number): void {
        this.fileProcessingSource.next(new FileRenderProgressMessage(progress));
    }
}