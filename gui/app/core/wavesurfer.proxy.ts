declare var WaveSurfer: any;

export class Region {
  public start: number;
  public end: number;
}

export class Wavesurfer {
    static create(config: any): Wavesurfer {
        var ws = WaveSurfer.create(config);
        return new Wavesurfer(ws);
    }

    static createTimeline(container: string, ws: Wavesurfer): any {
        var timeline = Object.create(WaveSurfer.Timeline);
        timeline.init({
            wavesurfer: ws.instance,
            container: '#waveform-timeline'
        });

        return timeline;
    }

    public instance: any;
    constructor(ws: any) {
        this.instance = ws;
    }

    loadBlob(file: File) {
        this.instance.loadBlob(file);
    }

    play(start?: number, end?: number): void {
        this.instance.play(start, end);
    }

    playPause(): void {
        this.instance.playPause();
    }

    toggleInteraction(): void {
        this.instance.toggleInteraction();
    }

    enableDragSelection(options: any): void {
        this.instance.enableDragSelection({});
    }

    addRegion(r: any): Region {
        return this.instance.addRegion(r);
    }

    regions() : any {
      return this.instance.regions;
    }

    isPlaying(): boolean {
        return this.instance.isPlaying();
    }

    on(event: string, f: (any) => void): void {
        this.instance.on(event, f);
    }
}
