/**
 * Created by bglebov on 13.10.2016.
 */

export interface IAudioBuffer {
    duration:number;
    length:number;
    numberOfChannels:number;
    sampleRate:number;

    getChannelData(channel:number): Float32Array;
}