/**
 * Created by bglebov on 13.10.2016.
 */

export interface IAudioBuffer {
    duration:number;
    length:number;
    numberOfChannels:number;
    sampleRate:number;

    getChannelData(channel:number): Float32Array;
    getData():Float32Array;
    copyFromChannel(destinition:Float32Array, channelNumber:number,startInChannel:number):void;
    copyToChannel(source:Float32Array, channelNumber:number,startInChannel:number):void;
}