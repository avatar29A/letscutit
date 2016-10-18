/**
 * Created by Warlock on 09.10.2016.
 */

import {IAudioBuffer} from "./audiobuffer.abstract";


// Wave represents data structure for helping to work with PCM data.
export class Wave {
    topBound: number = 0;
    bottomBound: number = 0;

    private _channels: Channel[];
    public get channels(): Channel[] {
        return this._channels;
    }

    public get duration(): number {
        return this.audioBuffer.duration;
    }

    public get sampleRate(): number {
        return this.audioBuffer.sampleRate;
    }

    constructor(public audioBuffer: IAudioBuffer) {
        this._channels = this.createChannels(audioBuffer);
    }

    //framing breaks pcm audio stream on frames with duration equals step's value.
    private framing(channelPCM: Float32Array, sampleRate: number, step: number = 1): Channel {
        let channel = new Channel(channelPCM);

        // calcs how many samples will store in one frame.
        let samplesInFrameAmount = sampleRate * step;
        let framesAmount = channelPCM.length / samplesInFrameAmount;

        // fc -> frame counter
        let globalIdx = 0;
        for (var fc = 0; fc < framesAmount; fc++) {
            let topSumValueAmount = 0;
            let topSumValue = 0;

            let bottomSumValueAmount = 0;
            let bottomSumValue = 0;

            for (var i = 0; i < samplesInFrameAmount; i++ , globalIdx++) {
                if (channelPCM[globalIdx] > 0) {
                    topSumValueAmount += 1;
                    topSumValue += channelPCM[globalIdx];
                } else {
                    bottomSumValueAmount += 1;
                    bottomSumValue += channelPCM[globalIdx];
                }
            }

            // make a new frame with two average values and them update Y axis' bounds:
            let frame = new Frame(this.calculateSumAverage(topSumValue, topSumValueAmount),
                this.calculateSumAverage(bottomSumValue, bottomSumValueAmount));
                
            this.updateYExtremum(frame);

            channel.add(frame);
        }

        return channel;
    }

    private calculateSumAverage(sum: number, count: number) {
        if (count == 0) {
            return 0;
        }

        return sum / count;
    }

    private createChannels(audioBuffer: IAudioBuffer): Channel[] {
        let channels: Channel[] = [];
        for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
            channels.push(this.framing(audioBuffer.getChannelData(i), audioBuffer.sampleRate));
        }

        return channels;
    }

    // updateYExtremum changes extremum values of the Y axis.
    private updateYExtremum(frame: Frame) {
        if (this.topBound < frame.top) {
            this.topBound = frame.top;
        }

        if (this.bottomBound > frame.bottom) {
            this.bottomBound = frame.bottom;
        }
    }
}

class Channel {
    constructor(public data:Float32Array){}

    private _frames: Frame[] = [];
    get frames(): Frame[] {
        return this._frames;
    }

    get length(): number {
        return this._frames.length;
    }

    add(frame: Frame): void {
        this._frames.push(frame);
    }
}

class Frame {
    constructor(public top: number, public bottom: number) {
    }
}
