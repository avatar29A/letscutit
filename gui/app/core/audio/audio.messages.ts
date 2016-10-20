/**
 * Created by bglebov on 14.10.2016.
 */

//========================================
//              Messages
// ========================================

import {IAudioBuffer} from "./audiobuffer.abstract";

export class FileLoadedMessage {
    constructor(public ab:IAudioBuffer) {
    }
}

export class FileRenderedMessage {
    constructor(public renderedBuffer:IAudioBuffer) {
    }
}

export class FileRenderProgressMessage {
    constructor(public progress:number) {
    }
}

export class FileProcessingErrorMessage {
    constructor(public error:any) {
    }
}

export class FilePlayedMessage {
    constructor(public currentTime:number) {

    }
}

export class AudioPlayMessage {
    constructor() {}
}

export class AuidoPauseMessage {
    constructor(){}
}

export class AudioStopMessage {
    constructor(){}
}