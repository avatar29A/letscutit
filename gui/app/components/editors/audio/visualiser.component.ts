/**
 * Created by Warlock on 02.10.2016.
 */

import {Component, Input, Inject, OnInit} from "@angular/core";
import {DOCUMENT} from '@angular/platform-browser';
import {Wave} from "../../../core/audio/wave"
import {IAudioBuffer} from "../../../core/audio/audiobuffer.abstract";
import {PlayerState} from "../../../core/audio/playerstate"

class Division {
    constructor(public value:number,
                public x1:number,
                public y1:number,
                public x2:number,
                public y2:number) {}
}

@Component({
    selector: 'wave-visualiser',
    template: '<canvas id="holst" width="{{HolstWidth}}" height="{{HolstHeight}}"></canvas>'
})
export class VisualiserComponent implements OnInit {

    // Colors:
    private scaleDefaultColor: string = "#6d87ae"
    private scalePlayedColor: string = "#0954b1";

    // Size and Merges
    private scaleDivisionWidth: number = 3;
    private scaleDivisionSpace: number = 1; // space between two scale divisions

    private host: HTMLCanvasElement;
    private hostCtx: CanvasRenderingContext2D;
    private data: IAudioBuffer;
    private wave: Wave;

    private numberSamplesPerFrame:number;
    private divisions:Division[];

    // Flags:
    private drawing: boolean;
    private isWaveDrawed: boolean;

    @Input() HolstWidth: number = 750;
    @Input() HolstHeight: number = 60;

    constructor( @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit(): void {
        this.host = <HTMLCanvasElement>this.document.getElementById('holst');
        this.hostCtx = this.host.getContext("2d");
    }

    // buffer()
    // Stores raw PCM data.
    public get buffer(): IAudioBuffer {
        return this.data;
    }

    public set buffer(ab: IAudioBuffer) {
        this.data = ab;
        this.wave = new Wave(ab);
        this.divisions = this.calculateAndMakeWaveFormDivisions(this.wave);
        this.drawWave(this.divisions);
    }

    // When visualization needs to integrate with player, you can bind this property with
    // currentTime from player instance. Then visualisation will render was played frames in other color.
    //
    // currentTime stores time into seconds.
    private _currentTime: number = 0;

    @Input()
    public set currentTime(value: number) {
        this._currentTime = value;
    }

    private _numberPlayedSamples:number;

    public get numberPlayedSamples():number {
        return this._numberPlayedSamples;
    }

    public set numberPlayedSamples(numberSamples:number) {
        this._numberPlayedSamples = numberSamples;
    }


    // Presents player's state, need to waveform's animation.
    private _playerState:PlayerState;

    @Input()
    public set PlayerState(state:PlayerState) {
        this._playerState = state;
    }

    redraw(): void {
        if (this.drawing) {
            return;
        }

        this.drawing = true;
        setTimeout(this.draw.bind(this), 100)
    }

    draw(): void {

        this.drawing = false;
    }

    animate():void {

    }

    animateNextDivision():void {

    }

    private calculateAndMakeWaveFormDivisions(wave: Wave):Division[] {
        let divisions:Division[] = [];

        let fullScaleDivisionWidth = this.scaleDivisionWidth + this.scaleDivisionSpace;
        let numberDivisions = this.HolstWidth / fullScaleDivisionWidth;

        let channel0 = wave.channels[0];

        // Calc how many samples should store in one frame
        this.numberSamplesPerFrame = channel0.data.length / numberDivisions;

        let x = 0;
        let zero = this.HolstHeight / 2; // a begining scale coords 

        let channelIdx = 0;
        for (var i = 0; i < numberDivisions; i++) {
            let averageFrameValue = 0;
            let averageFrameCount = 0;

            // accumulate all samples from one frame and calc average value:
            for (var j = 0; j < this.numberSamplesPerFrame; channelIdx++ , j++) {
                let sample = channel0.data[channelIdx];

                // counting only positive samples:
                if (sample > 0) {
                    averageFrameValue += sample;
                    averageFrameCount++;
                }
            }

            // calc average value:
            averageFrameValue /= averageFrameCount;

            // search value on Y-axis
            let topY = zero - (zero / (this.wave.topBound / averageFrameValue));

            // and draw wave-line
            divisions.push(new Division(averageFrameValue, x, topY, x, this.HolstHeight));
            
            // move forward
            x += fullScaleDivisionWidth;
        }

        return divisions;
    }

    private drawWave(divisions: Division[]): void {
        if (this.isWaveDrawed) {
            return;
        }

        let context = this.hostCtx;
        context.clearRect(0, 0, this.HolstWidth, this.HolstHeight);

        for (let division of divisions) {
            this.drawScaleDivision(division.x1, division.y1, division.x2, division.y2, this.scaleDefaultColor, context);
        }

        this.isWaveDrawed = true;
    }

    private drawScaleDivision(x1: number, y1: number, x2: number, y2: number, color: string, context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = this.scaleDivisionWidth;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}