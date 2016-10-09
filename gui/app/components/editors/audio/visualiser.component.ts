/**
 * Created by Warlock on 02.10.2016.
 */

import {Component, Inject, OnInit} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'wave-visualiser',
    template: '<canvas id="holst" width="800" height="600"></canvas>'
})
export class VisualiserComponent implements OnInit {
    private _holst:HTMLCanvasElement;
    private _holstCtx:CanvasRenderingContext2D;
    private _data:AudioBuffer;

    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnInit():void {
        this._holst = <HTMLCanvasElement>this.document.getElementById('holst');
        this._holstCtx = this._holst.getContext("2d");
    }

    public set buffer(ab:AudioBuffer) {
        this._data = ab;
        this.draw();
    }

    public get buffer():AudioBuffer {
        return this._data;
    }

    draw() {
        let width = this._holst.width;
        let height = this._holst.height;

        let context = this._holstCtx;

        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(0, 0, width, height);

        context.lineWidth = 2;
        context.strokeStyle = 'rgb(0, 0, 0)';

        // distance between to points (scale is equal an one second):
        let distance = (width * 1.0) / this.buffer.duration;

        let channel0 = this.buffer.getChannelData(0);

        let frameBound = 0;
        let frameSumValue = 0;
        let drownFrameAmount = 0;
        let averageValues = [];
        let x = 0;

        context.beginPath();

        for (var i = 0; i < channel0.length; i++) {
            frameBound += 1;
            frameSumValue += channel0[i];

            // Draw frame. Frame's value is equal average sum whole samples.
            if (frameBound === this.buffer.sampleRate - 1) {
                let frameAverageValue = (frameSumValue / this.buffer.sampleRate) * 100000;
                averageValues.push(frameAverageValue);

                var y = frameAverageValue + height / 2;

                if (drownFrameAmount === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                drownFrameAmount += 1;
                x += distance;

                // reset
                frameBound = 0;
                frameSumValue = 0;
            }
        }

        context.lineTo(this._holst.width, this._holst.height / 2);
        context.stroke();
    }
}