/**
 * Created by Warlock on 03.10.2016.
 */

import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

export class ProgressMessage {
    constructor(public progress:number) {
    }
}

export class FlashProgressMessage {
    constructor(public flash:number = 0) {
    }
}

export class AppBusySpinnerMessage  {
    constructor(public isNeedShow:boolean) {
    }
}

const Pause = 400;

@Injectable()
export class BusyNotificationService {
    private applicationBusyTurnOnOffSource = new Subject<any>();
    applicationBusyTurnOnOff$ = this.applicationBusyTurnOnOffSource.asObservable();

    busyTurnOn():void {
        this.progressUp10();
    }

    prepare():void{
        this.progressUpTo(5);
    }

    progressUp10(oldvalue:number = 0):Promise<void> {
        return this.progressUpTo(10 + oldvalue);
    }

    progressUpTo(progress:number, pause?:number):Promise<void> {
        if (pause == null) {
            pause = Pause;
        }

        this.applicationBusyTurnOnOffSource.next(new ProgressMessage(progress));
        return this.delay(pause);
    }

    progressFlash() {
        return this.progressComplete();
    }

    progressComplete() {
        this.progressUpTo(100, 2000).then(
            ()=> {
                this.progressUpTo(0, 100)
            });
    }

    appBusySpinnerShow():void {
        this.applicationBusyTurnOnOffSource.next(new AppBusySpinnerMessage(true));
    }

    appBusySpinnerHide():void {
        this.applicationBusyTurnOnOffSource.next(new AppBusySpinnerMessage(false));
    }

    private delay(ms:number):Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }
}