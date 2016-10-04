/**
 * Created by Warlock on 03.10.2016.
 */

import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

export interface IAppProgressMessage {
}

export class ProgressMessage implements IAppProgressMessage {
    constructor(public progress:number) {
    }
}

export class FlashProgressMessage implements IAppProgressMessage {
    constructor(public flash:number = 0) {
    }
}

export class AppBusySpinnerMessage implements IAppProgressMessage {
    constructor(public isNeedShow:boolean) {
    }
}

export class ResetMessage implements IAppProgressMessage {

}

const Pause = 400;

@Injectable()
export class BusyNotificationService {
    private applicationBusyTurnOnOffSource = new Subject<IAppProgressMessage>();
    applicationBusyTurnOnOff$ = this.applicationBusyTurnOnOffSource.asObservable();

    busyTurnOn():void {
        this.progressUp10();
    }

    async progressUp10(oldvalue:number = 0):void {
        await this.progressUpTo(10 + oldvalue);
    }

    async progressUpTo(progress:number, pause?:number):void {
        if (pause == null) {
            pause = Pause;
        }

        this.applicationBusyTurnOnOffSource.next(new ProgressMessage(progress));
        await this.delay(pause);
    }

    async progressFlash():void {
        //await this.progressUp10(10);
        await  this.progressComplete();
    }

    async progressComplete():void {
        await this.progressUpTo(100, 2000);
        await this.progressUpTo(0, 100);
    }

    appBusySpinnerShow():void {
        this.applicationBusyTurnOnOffSource.next(new AppBusySpinnerMessage(true));
    }

    appBusySpinnerHide():void {
        this.applicationBusyTurnOnOffSource.next(new AppBusySpinnerMessage(false));
    }

    private progressCompleted():void {
        this.applicationBusyTurnOnOffSource.next(new ResetMessage());
    }

    private delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}