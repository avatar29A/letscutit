/**
 * Created by bglebov on 13.10.2016.
 */

import {IAudioWrapper} from "./audiowrapper.abstract";
import {Observable, Subject} from "rxjs/Rx";

/*
 AuroraAudioWrapper
 */
export class AuroraAudioWrapper implements IAudioWrapper {
    // ************
    // Fields
    // ************
    private _source:File;

    // ************
    // .ctor
    // ************
    constructor(source:File) {
        this._source = source;
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
    fileProcessing$: Observable<any> = this.fileProcessingSource.asObservable();
}