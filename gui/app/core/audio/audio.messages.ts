/**
 * Created by bglebov on 14.10.2016.
 */

//========================================
//              Messages
// ========================================

export class FileLoadedMessage {
    constructor(public ab:AudioBuffer) {
    }
}

export class FileRenderedMessage {
    constructor(public renderedBuffer:AudioBuffer) {
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
