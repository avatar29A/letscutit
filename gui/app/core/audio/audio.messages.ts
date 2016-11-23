/**
 * Created by bglebov on 14.10.2016.
 */

//========================================
//              Messages
// ========================================

import {IAudioBuffer} from "./audiobuffer.abstract";

export class FileLoadedMessage {
    // sends whole decoded audio stream. 
    constructor(public ab:IAudioBuffer) {
    }
}

export class FileRenderedMessage {
    // sends data that were rendered (decoded), in one time it keeps only part of data.
    constructor(public renderedBuffer:IAudioBuffer) {
    }
}

export class FileRenderProgressMessage {
    // keeps info about decoding progress. Progress parameter is number from 0 to 100 (%).
    constructor(public progress:number) {
    }
}

export class FileProcessingErrorMessage {
    constructor(public error:any) {
    }
}

export class FilePlayedMessage {
    // sends current time in to ms.
    constructor(public currentTime:number) {

    }
}

export class SamplesPlayedMessage {
    // sends number of played samples 
    constructor(public numberSamples:number) {

    }
}

export class AudioPlayMessage {
    // sends info about that an audio was started to play.
    constructor() {}
}

export class AudioPauseMessage {
    // sends info about that an audio was paused.
    constructor(){}
}

export class AudioStopMessage {
    // sends info about that an audio was stopped.
    constructor(){}
}