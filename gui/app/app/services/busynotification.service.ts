/**
 * Created by Warlock on 03.10.2016.
 */

import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

export class BusyNotifyConfig {
    constructor(public state:boolean, public isShowSpinner, public progress:number = 0) {
    }
}

@Injectable()
export class BusyNotificationService {
    private applicationBusyTurnOnOffSource = new Subject<BusyNotifyConfig>();

    applicationBusyTurnOnOff$ = this.applicationBusyTurnOnOffSource.asObservable();

    busyTurnOn(isShowSpinner:boolean = false) {
        this.applicationBusyTurnOnOffSource.next(new BusyNotifyConfig(true, isShowSpinner, 25));
    }

    progressUpTo(progress:number, isShowSpinner:boolean = false):void {
        this.applicationBusyTurnOnOffSource.next(new BusyNotifyConfig(true, isShowSpinner, progress))
    }

    progressUp10(isShowSpinner:boolean = false) {
        this.progressUpTo(10, isShowSpinner);
    }

    busyTurnOff() {
        this.applicationBusyTurnOnOffSource.next(new BusyNotifyConfig(false, false));
    }
}