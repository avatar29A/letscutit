/**
 * Created by Warlock on 02.10.2016.
 */

import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'wave-visualiser',
    template: '<canvas id="holst" width="800" height="600"></canvas>'
})
export class VisualiserComponent implements OnInit {
    private _holst:HTMLCanvasElement;
    private _holstCtx:CanvasRenderingContext2D;
    private _data:Uint8Array;

    constructor() {
    }

    ngOnInit():void {
        this._holst = <HTMLCanvasElement>document.getElementById('holst');
        this._holstCtx = this._holst.getContext("2d");
    }

    public set frames(data:Uint8Array) {
        this._data = data;
        this.draw();
    }

    public get frames():Uint8Array {
        return this._data;
    }

    draw() {
        let drawVisual = requestAnimationFrame(this.draw.bind(this));

        let width = this._holst.width;
        let height = this._holst.height;

        this._holstCtx.clearRect(0, 0, width, height);

        this._holstCtx.fillStyle = 'rgb(0, 0, 0)';
        this._holstCtx.fillRect(0, 0, width, height);

        let barWidth = (width / this.frames.length) * 2.5;
        let barHeight;
        let x = 0;

        for (var i = 0; i < this.frames.length; i++) {
            barHeight = this.frames[i] / 2;

            this._holstCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            this._holstCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
}