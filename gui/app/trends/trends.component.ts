/**
 * Created by Warlock on 28.09.2016.
 */

import {Component} from "@angular/core";
import {BusyNotificationService} from "../app/services/busynotification.service";

@Component({
    selector: 'about',
    template: "<button class='button is-prime' (click)='startAwait()'>Start Busy</button>" +
    "<button class='button is-prime' (click)='stopAwait()'>Stop Busy</button>" +
    "<button class='button is-prime' (click)='set100()'>Set 100</button>"
})
export class TrendsComponent {
    progress:number = 0;

    constructor(private busyNotificator:BusyNotificationService) {
        
    }

    startAwait():void {
        this.progress += 10;
        if (this.progress > 100) {
            this.progress = 0;
        }

        this.busyNotificator.progressUpTo(this.progress);
    }

    stopAwait():void {
        this.progress = 0;
        this.busyNotificator.busyTurnOff();
    }

    set100():void {
        this.busyNotificator.progressUpTo(100);
    }
}