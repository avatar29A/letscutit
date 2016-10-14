/**
 * Created by bglebov on 13.10.2016.
 */

declare var AV:any;
declare var AVBuffer:any;

export class Aurora {
    Player = new PlayerProxy();
    Asset = new AssetProxy();
}

// AssetProxy
// Proxy class for Asset from Aurora.js
class AssetProxy {
    fromUrl(url:string, opts?:any):any {
        return AV.Asset.fromUrl(url, opts);
    }

    fromFile(file:File):any {
        return AV.Asset.fromFile(file);
    }

    static fromBuffer(buffer:any):any {
        return AV.Asset.fromBuffer(buffer);
    }

    static start(decode:any):void {
        AV.Asset.start(decode);
    }

    static stop():void {
        AV.Asset.stop();
    }
}

// PlayerProxy
// Proxy class for Player from Aurora.js
class PlayerProxy {
    static fromUrl(url:string, opts?:any):any {
        return AV.Player.fromUrl(url, opts);
    }

    fromFile(file:File):PlayerProxy {
        return AV.Player.fromFile(file);
    }

    fromBuffer(buffer:any):PlayerProxy {
        return AV.Player.fromBuffer(buffer);
    }

    play():any {
        return AV.Player.play();
    }

    stop():void {
        AV.Player.stop();
    }

    seek(timestamp:number):void {
        AV.Player.seek(timestamp);
    }

    get duration():number {
        return AV.Player.duration;
    }

    get currentTime():number {
        return AV.Player.currentTime;
    }

    get volume():number {
        return AV.Player.volume;
    }

    get playing():boolean {
        return AV.Player.playing;
    }

    get pan():number {
        return AV.Player.pan;
    }
}

// AVBufferProxy
// Proxy class for AVBuffer from Aurora.js
class AVBufferProxy {
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
