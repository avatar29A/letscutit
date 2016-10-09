/**
 * Created by Warlock on 02.10.2016.
 */

import {Component, Input, Inject, OnInit} from "@angular/core";
import {DOCUMENT} from '@angular/platform-browser';
import {Wave} from "../../../core/audio/wave"

@Component({
    selector: 'wave-visualiser',
    template: '<canvas id="holst" width="{{HolstWidth}}" height="{{HolstHeight}}"></canvas>'
})
export class VisualiserComponent implements OnInit {
    private _holst: HTMLCanvasElement;
    private _holstCtx: CanvasRenderingContext2D;
    private _data: AudioBuffer;

    @Input() HolstWidth: number = 800;
    @Input() HolstHeight: number = 600;

    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnInit(): void {
        this._holst = <HTMLCanvasElement>this.document.getElementById('holst');
        this._holstCtx = this._holst.getContext("2d");
    }

    public set buffer(ab: AudioBuffer) {
        this._data = ab;
        this.draw();
    }

    public get buffer(): AudioBuffer {
        return this._data;
    }

    draw() {
        let context = this._holstCtx;
        context.lineWidth = 1;
        context.strokeStyle = '#6d87ae';

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

            context.moveTo(x, topY);
            context.lineTo(x, bottomY);

            x += distance;
        }

        context.stroke();
    }
}