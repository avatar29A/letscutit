/**
 * Created by bglebov on 07.10.2016.
 */

import {Observable} from "rxjs/Rx";

//
// IAudioWrapper provides basic methods for work this binary audio data.
//
// We extracted this interface because for other browser might be require own implementation (for instance if
// AudioWrapper based on Web Audio API it won't work in older browser).
export interface IAudioWrapper {
    fileProcessing$: Observable<any>;
    new(source:File):IAudioWrapper;
}