/**
 * Created by Warlock on 28.09.2016.
 */

import {Component} from "@angular/core";
import {BusyNotificationService} from "../app/services/app-notification.service";

@Component({
    selector: 'about',
    template: "<button class='button is-prime' (click)='startAwait()'>Start Busy</button>" +
    "<button class='button is-prime' (click)='stopAwait()'>Stop Busy</button>" +
    "<button class='button is-prime' (click)='set100()'>Set 100</button>"
})
export class TrendsComponent {
    progress:number = 15;

    constructor(private busyNotificator:BusyNotificationService) {
        
    }

    startAwait():void {
        this.startTask();
    }

    stopAwait():void {
        this.progress = 0;
    }

    set100():void {
        this.busyNotificator.progressUpTo(100);
    }

    private startTask():void {
        this.busyNotificator.appBusySpinnerShow();
        this.busyNotificator.progressFlash();
    }
}