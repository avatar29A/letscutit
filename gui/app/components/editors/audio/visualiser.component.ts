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

    private drawWave(wave:Wave): void {
        if (this.isWaveDrawed) {
            return;
        }

        let context = this.hostCtx;
        context.clearRect(0, 0, this.HolstWidth, this.HolstHeight);

        let fullScaleDivisionWidth = this.scaleDivisionWidth + this.scaleDivisionSpace;
        let numberDivisionsPerFrame = this.HolstWidth / fullScaleDivisionWidth;

        let x = 0;
        let zero = this.HolstHeight / 2;

        for (var i = 0; i < numberDivisionsPerFrame; i++) {
            let delta1 = 10 + Math.floor(Math.random() * 10);

            this.drawScaleDivision(x, zero - delta1, x, this.HolstHeight, context);
            x += fullScaleDivisionWidth;
        }

        this.isWaveDrawed = true;
    }

    private drawScaleDivision(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.strokeStyle = this.scalePlayedColor;
        context.lineWidth = this.scaleDivisionWidth;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}

      // let channel0 = this.wave.channels[0];
     // let topY = zero - (zero / (this.wave.topBound / frame.top));
            // let bottomY = zero + (zero / (this.wave.bottomBound / frame.bottom));