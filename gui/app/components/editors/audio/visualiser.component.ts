/**
 * Created by Warlock on 02.10.2016.
 */

import {Component, Input, Inject, OnInit} from "@angular/core";
import {DOCUMENT} from '@angular/platform-browser';
import {Wave} from "../../../core/audio/wave"
import {IAudioBuffer} from "../../../core/audio/audiobuffer.abstract";

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
    private divisions = [];

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

    public set buffer(ab: IAudioBuffer) {
        this.data = ab;
        this.wave = new Wave(ab);
        this.drawWave(this.wave);
    }

    public get buffer(): IAudioBuffer {
        return this.data;
    }

    // When visualization needs to integrate with player, you can bind this property with
    // currentTime from player instance. Then visualisation will render was played frames in other color.
    //
    // currentTime stores time into seconds.
    private _currentTime: number = 0;

    @Input()
    public set CurrentTime(value: number) {
        this._currentTime = value;
        this.redraw();
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

    private drawWave(wave: Wave): void {
        if (this.isWaveDrawed) {
            return;
        }

        let context = this.hostCtx;
        context.clearRect(0, 0, this.HolstWidth, this.HolstHeight);

        let fullScaleDivisionWidth = this.scaleDivisionWidth + this.scaleDivisionSpace;
        let numberDivisions = this.HolstWidth / fullScaleDivisionWidth;

        let channel0 = this.wave.channels[0];

        // Calc how many samples should store in one frame
        this.numberSamplesPerFrame = channel0.data.length / numberDivisions;
        console.log("numberSamplesPerFrame: " + this.numberSamplesPerFrame);

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
            this.drawScaleDivision(x, topY, x, this.HolstHeight, this.scaleDefaultColor, context);
            this.divisions.push({
                x1:x,
                y1:topY,
                x2:x,
                y2:topY
            });
            
            // move forward
            x += fullScaleDivisionWidth;
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