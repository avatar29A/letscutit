/**
 * Created by bglebov on 13.10.2016.
 */

import {IAudioBuffer} from "./audio/audiobuffer.abstract";

declare var AV:any;
declare var AVBuffer:any;

export class Aurora {
    Player = new PlayerProxy();
    Asset = new AssetProxy();
}

class AuroraFormat {
    bitrate:number;
    channelsPerFrame:number;
    floatingPoint:number;
    formatID:string;
    sampleRate:number;
}

class AuroraMetadata {
    album:string;
    artist:string;
    coverArt: {
        data: Uint8Array,
        length: number,
    };
    genre:string;
    title:string;
    trackNumber:string;
    userText: {
        description:string,
        value:string
    };
    year:string;
}

// AssetProxy
// Proxy class for Asset from Aurora.js
export class AssetProxy {
    fromUrl(url:string, opts?:any):AssetProxy {
        return AV.Asset.fromUrl(url, opts);
    }

    fromFile(file:File):AssetProxy {
        return AV.Asset.fromFile(file);
    }

    fromBuffer(buffer:ArrayBuffer|AVBufferProxy|any):AssetProxy {
        return AV.Asset.fromBuffer(buffer);
    }

    // Starts the decoding process of the asset.
    start(decode:boolean):void {
        AV.Asset.start(decode);
    }

    // Pauses the decoding process of the asset.
    stop():void {
        AV.Asset.stop();
    }

    // Extract some information about audio from source.
    //
    // event: expected following values: 'format' or 'duration' or 'metadata'
    // callback: will invoke when needing information will be extracted.
    get(event:string, callback:(e:any)=>void):void {
        AV.Asset.get(event, callback);
    }

    // decodePacket invokes methods 'decode' from a decoder instance.
    decodePacket():any {
        return AV.Asset.decodePacket();
    }

    // Decodes the entire file and calls callback with a single Float32Array containing the decoded samples. 
    // It is preferrable to use the streaming decoding APIs (e.g. data events), so use this as a last resort 
    // when using such a streaming API is impossible.
    decodeToBuffer(callback:(any)=>void):void {
        AV.Asset.decodeToBuffer(callback);
    }

    // Subsribe on event
    //
    // Supported events:
    //  buffer, percent - Emitted while the audio file is being loaded with a percentage between 0 and 100 representing the amount of the file that has been read so far.
    //  format, object - Emitted when the demuxer has decoded enough information to determine basic format information about the audio file.
    //  duration, msecs - Emitted when the duration of the audio file has been parsed.
    //  metadata. object - Emitted when any embedded metadata is decoded. 
    //  decodeStart - Emitted when decoding of the actual audio data begins.
    //  data, buffer - Emitted when audio data is decoded. buffer is a Float32Array containing decoded Linear PCM audio. The data emitted by this event is always a Float32Array; if you need the original data as returned by the decoder, use the decoder's data event.
    //  error, err - Emitted when the an error is encountered in the decoding process. Whenever an error is encountered, the decoding process is also stopped automatically.
    on(event:string, callback:(any)=>void):void {
        AV.Asset.on(event, callback);
    }

    // The duration of the audio file in milliseconds.
    get duration():number {
        return AV.Asset.duration;
    }

    // The percentage of the audio file that has been buffered by the source.
    get buffered():number {
        return AV.Asset.buffered;
    }

    // Returns information about file audio format (mp3, flack or other)
    get format():AuroraFormat {
        return AV.Asset.format;
    }

    // Return information about audio track (for instance title, artist, maked yaer and so on)
    get metadata():AuroraMetadata {
        return AV.Asset.metadata;
    }
}

// PlayerProxy
// Proxy class for Player from Aurora.js
export class PlayerProxy {
    static fromUrl(url:string, opts?:any):any {
        return AV.Player.fromUrl(url, opts);
    }

    fromFile(file:File):PlayerProxy {
        return AV.Player.fromFile(file);
    }

    fromBuffer(buffer:ArrayBuffer|AVBufferProxy|any):PlayerProxy {
        return AV.Player.fromBuffer(buffer);
    }

    // Starts loading the asset without playing it.
    preload():void {
        AV.Player.preload();
    }

    // Starts playback for the asset. If it hasn't been preloaded yet, preload will be called for you.
    play():void {
        AV.Player.play();
    }

    // Pauses playback for the asset such that calling play will start playback where it left off.
    pause():void {
        AV.Player.pause();
    }

    // Stops playback of the asset in a destructive way.
    stop():void {
        AV.Player.stop();
    }

    seek(timestamp:number):void {
        AV.Player.seek(timestamp);
    }

    // Subsribe to event
    // Supported events:
    //  'buffer', percent - Emitted while the audio file is being loaded with a percentage between 0 and 100 representing the amount of the file that has been read so far.
    //  'format', object - Emitted when the demuxer has decoded enough information to determine basic format information about the audio file.
    //  'duration', msecs - Emitted when the duration of the audio file has been parsed.
    //  'metadata', object - Emitted when any embedded metadata is decoded.
    //  'ready' - Emitted when the audio file is ready to play.
    //  'progress', msecs - Emitted while the audio file is playing with updates to the current playback time in milliseconds.
    //  'error', err - Emitted when the an error is encountered in the decoding process. Whenever an error is encountered, the decoding process is also stopped automatically.
    //  'end' - Emitted when the audio file ends.
    on(event:string, callback:(e:any)=>void):void {
        AV.Player.on(event, callback);
    }

    // The percentage of the audio file that has been buffered by the source.
    get buffered():number {
        return AV.Asset.buffered;
    }

    // The duration of the audio file in milliseconds.
    get duration():number {
        return AV.Player.duration;
    }

    // The current playback time in milliseconds.
    get currentTime():number {
        return AV.Player.currentTime;
    }

    // The volume of the player as a percentage from 0 to 100. Change this property to adjust the output volume.
    get volume():number {
        return AV.Player.volume;
    }

    // Whether the file is currently playing.
    get playing():boolean {
        return AV.Player.playing;
    }

    // The stereo pan of the player as a percentage from 0 to 100.
    get pan():number {
        return AV.Player.pan;
    }

    // The format object describing the audio format as returned by the demuxer
    get format():AuroraFormat {
        return AV.Player.format;
    }

    // An object containing any metadata embedded in the audio file.
    get metadata():AuroraMetadata {
        return AV.Player.metadata;
    }

    // The backing AV.Asset for the player.
    get asset():AssetProxy {
        return AV.Player.asset;
    }
    
}

// AVBufferProxy
// Proxy class for AVBuffer from Aurora.js
export class AVBufferProxy {
    allocate(size:number):AVBufferProxy {
        return AVBuffer.allocate(size);
    }

    copy():AVBufferProxy {
        return AVBuffer.copy();
    }

    slize(position:number, length:number):AVBufferProxy {
        return AVBuffer.slize(position, length);
    }

    makeBlob(data:any, type:any):Blob {
        return AVBuffer.makeBlob(data, type);
    }

    makeBlobURL(data:any, type:any):string {
        return AVBuffer.makeBlobURL(data, type);
    }

    revokeBlobURL(url:string):string {
        return AVBuffer.revokeBlobURL(url);
    }

    toBlob():Blob {
        return AVBuffer.toBlob();
    }

    toBlobURL():string {
        return AVBuffer.toBlobURL;
    }
}

export class AuroraAudioBuffer implements IAudioBuffer {
    // .ctor
    constructor(public pcm:Float32Array){}

    static fromArray(array:Float32Array):AuroraAudioBuffer {
        return new AuroraAudioBuffer(array);
    }

    // ***************
    // Properties 
    // ***************

    get duration():number {
        if(!this.checkAsset()) {
            return 0;
        }

        // convert to seconds
        return this._asset.duration / 1000;
    }

    get length():number {
        return this.pcm.length;
    }

    get numberOfChannels():number {
        if(!this.checkAsset()) {
            return 0;
        }

        return this._asset.format.channelsPerFrame;
    }

    get sampleRate():number {
        if(!this.checkAsset()) {
            return 0;
        }

        return this._asset.format.sampleRate;
    }

    private _asset:AssetProxy;
    get asset():AssetProxy {
        return this._asset;
    }

    // ***************
    //  Methods
    // ***************

    attachAsset(asset:AssetProxy) {
        this._asset = asset;
    }

    getChannelData(channel:number): Float32Array {
        return this.pcm;
    }

    getData():Float32Array {
        return this.pcm;
    }

    copyFromChannel(destinition:Float32Array, channelNumber:number,startInChannel:number):void {
        console.error("Not implemented");
    }

    copyToChannel(source:Float32Array, channelNumber:number,startInChannel:number):void {
        console.error("Not implemented");
    }

    // ***************
    // Private methods
    // ***************

    // checkAsset checks that field _asset is not null, otherwise writes to console about it and returns false. 
    private checkAsset():boolean {
        if(this._asset == null) {
            console.log("You need to attach asset to first. Use attachAsset methods for it.");
            return false;
        }

        return true;
    }
}