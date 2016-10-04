/**
 * Created by Warlock on 03.10.2016.
 */

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

class BusyNotifyConfig {
    constructor(public state:boolean, public isShowSpinner, public progress:number = 0) {
    }
}

@Injectable()
export class BusyNotificationService {
    private applicationBusyTurnOnOffSource = new Subject<BusyNotifyConfig>();

    applicationBusyTurnOnOff$ = this.applicationBusyTurnOnOffSource.asObservable();

    busyTurnOn(isShowSpinner) {
        this.applicationBusyTurnOnOffSource.next(new BusyNotifyConfig(true, isShowSpinner));
    }

    busyTurnOff() {
        this.applicationBusyTurnOnOffSource.next(new BusyNotifyConfig(false, false));
    }
}