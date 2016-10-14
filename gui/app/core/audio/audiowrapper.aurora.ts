/**
 * Created by bglebov on 13.10.2016.
 */

import {IAudioWrapper} from "./audiowrapper.abstract";
import {Observable, Subject} from "rxjs/Rx";
import {Aurora} from "../aurora.proxy";
import {VisualiserComponent} from "../../components/editors/audio/visualiser.component";
import {ViewChild} from "@angular/core";
import {
    FileLoadedMessage, FileRenderedMessage, FileProcessingErrorMessage,
    FileRenderProgressMessage
} from "./audio.messages";

/*
 AuroraAudioWrapper
 */
export class AuroraAudioWrapper implements IAudioWrapper {
    // ************
    // Fields
    // ************
    private _source:File;
    private av:Aurora = new Aurora();

    // ************
    // Components
    // ************
    @ViewChild(VisualiserComponent)
    private visualiser:VisualiserComponent;

    // ************
    // .ctor
    // ************
    constructor(source:File) {
        this._source = source;
        this.fileProcessingSource.next(new FileRenderProgressMessage(100));
    }

    // ************
    // Properties
    // ************
    get source():File {
        return this._source;
    }

    // ************
    // Events
    // ************

    private fileProcessingSource = new Subject<any>();
    fileProcessing$:Observable<any> = this.fileProcessingSource.asObservable();

    // ************
    // Methods
    // ************

    play():void {
        var player = this.av.Player.fromFile(this.source);
        player.play();
    }

    pause():void {
        this.av.Player.stop();
    }
}