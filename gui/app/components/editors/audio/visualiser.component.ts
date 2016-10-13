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
    private _holst: HTMLCanvasElement;
    private _holstCtx: CanvasRenderingContext2D;
    private _data: IAudioBuffer;

    @Input() HolstWidth: number = 800;
    @Input() HolstHeight: number = 600;

    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnInit(): void {
        this._holst = <HTMLCanvasElement>this.document.getElementById('holst');
        this._holstCtx = this._holst.getContext("2d");
    }

    public set buffer(ab: IAudioBuffer) {
        this._data = ab;
        this.draw();
    }

    public get buffer(): IAudioBuffer {
        return this._data;
    }

    // When visualization needs to integrate with player, you can bind this property with
    // currentTime from player instance. Then visualisation will render was played frames in other color.
    //
    // currentTime stores time into seconds.
    private _currentTime: number = 0;

    @Input()
    public set CurrentTime(value: number) {
        this._currentTime = value;

        // update
        this.draw();
    }

    draw() {
        let context = this._holstCtx;
        context.lineWidth = 1;

        // make Wave
        let wave = new Wave(this.buffer);

        // distance between to points (scale is equal an one second):
        let distance = this.HolstWidth / wave.duration;
        let zero = this.HolstHeight / 2;
        let x = 0;
        let channel0 = wave.channels[0];

        for (var i = 0; i < channel0.length; i++) {
            let frame = channel0.frames[i];

            let topY = zero - (zero / (wave.topBound / frame.top));
            let bottomY = zero + (zero / (wave.bottomBound / frame.bottom));

            // draws frame line:
            context.beginPath();
            console.log(i + " <= " + this._currentTime);
            context.strokeStyle = i <= this._currentTime ? '#0950ac' : '#6d87ae';
            context.moveTo(x, topY);
            context.lineTo(x, bottomY);
            context.stroke();

            x += distance;
        }
    }
}