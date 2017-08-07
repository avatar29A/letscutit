import { Component, Input, Inject, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Wavesurfer, Region } from "../../../core/wavesurfer.proxy";
import { Http, Headers } from "@angular/http";

@Component({
    selector: 'waveform',
    template: `

<div id="waveform"></div>
<div id="waveform-timeline"></div>
<div style="margin-top: 10px; display: flex; flex-direction: row; justify-content: flex-end">
<a class="button is-outlined" style="width: 100px" (click)="play()">
  <span *ngIf="!isPlaying">
    <span class="icon">
      <i class="fa fa-play"></i>
    </span>
    <span>Play</span>
  </span>

  <span *ngIf="isPlaying">
    <span class="icon">
      <i class="fa fa-pause"></i>
    </span>
    <span>Pause</span>
  </span>
</a>

<a class="button is-outlined" style="width: 100px; margin-left: 3px;" (click)="cutIt()">
 <span class="icon">
      <i class="fa fa-scissors"></i>
  </span>
  <span>Cut It!</span>
</a>
</div>
`
})
export class WaveformComponent implements AfterViewInit {
    private ws: Wavesurfer;
    private f: File;
    private region: Region;

    public isPlaying: boolean;

    play() {
        this.ws.playPause()
        this.isPlaying = this.ws.isPlaying()
    }

    cutIt() {
      console.log(this.http)
      this.http.post('/api/cutit', {start: this.region.start, end: this.region.end, file: this.f},{
                headers: new Headers({
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                })
            }).subscribe(() => console.log("post compleate"));
    }

    ngAfterViewInit() {
        this.ws = Wavesurfer.create({
            container: '#waveform',
            waveColor: '#6d87ae',
            progressColor: '#0950ac'
        })

        this.ws.loadBlob(this.f);
        this.ws.on("ready", (function() {
            Wavesurfer.createTimeline("#waveform-timeline", this.ws);

            // Add region
            this.region = this.ws.addRegion({
                start: 0, // time in seconds
                end: 20, // time in seconds
                resize: true,
                drag: true,
                color: 'rgba(96, 141, 204, 0.1)'
            });

        }).bind(this));
    }

    constructor(private http: Http) {
    }

    @Input()
    public set File(file: File) {
        this.f = file;
    }
}
