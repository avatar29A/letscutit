/**
 * Created by Warlock on 28.09.2016.
 */

import {Component, Inject, OnInit, Input} from "@angular/core";
import {DOCUMENT} from '@angular/platform-browser';
import {BusyNotificationService} from "../../services/app/appbusy-notification.service";


@Component({
    selector: 'trends',
    template: `
    <div>
        <canvas id="holst" width="{{HolstWidth}}" height="{{HolstHeight}}"></canvas>
    </div>
    <div>
        <button (click)="start()">Let's go</button>
    </div>
    `
})
export class TrendsComponent implements OnInit {
    private host: HTMLCanvasElement;
    private hostCtx: CanvasRenderingContext2D;

    // Size and Merges
    private scaleDivisionWidth: number = 3;
    private scaleDivisionSpace: number = 1; // space between two scale divisions

    @Input() HolstWidth: number = 100;
    @Input() HolstHeight: number = 100;

    constructor( @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit(): void {
        this.host = <HTMLCanvasElement>this.document.getElementById('holst');
        this.hostCtx = this.host.getContext("2d");


    }

    redraw(): void {
        console.log("redraw");
        requestAnimationFrame(this.redraw.bind(this));
    }

    draw(): void {
        let context = this.hostCtx;
        let space = 4;

        context.clearRect(0, 0, this.HolstWidth, this.HolstHeight);
        let fullScaleDivisionWidth = this.scaleDivisionWidth + this.scaleDivisionSpace;

        for (var i = 0; i < 10; i++) {
            let x = i * fullScaleDivisionWidth;
            this.drawScaleDivision(x, 10, x, 100, '#000000', context);
        }

        requestAnimationFrame(this.redraw.bind(this));
    }

    private drawScaleDivision(x1: number, y1: number, x2: number, y2: number, color: string, context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = this.scaleDivisionWidth;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    start(): void {
        this.draw();
    }
}