/**
 * Created by warlock on 18.09.16.
 */

import {
    Component,
    trigger, style, state, transition, animate
} from "@angular/core"
import {BusyNotificationService, BusyNotifyConfig} from "./services/busynotification.service";


@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/app/app.template.html',
    styleUrls: ['css/app.component.css'],
    providers: [BusyNotificationService],
    animations: [
        trigger('busyIndicatorState', [
            state('progress0', style({
                width: '0',
                opaoity: '0'
            })),

            state('progress10', style({
                width: '10%',
                opacity: 1
            })),

            state('progress20', style({
                width: '20%'
            })),

            state('progress30', style({
                width: '30%'
            })),

            state('progress40', style({
                width: '40%'
            })),

            state('progress50', style({
                width: '50%'
            })),

            state('progress60', style({
                width: '60%'
            })),

            state('progress70', style({
                width: '70%'
            })),

            state('progress80', style({
                width: '80%'
            })),

            state('progress90', style({
                width: '90%'
            })),

            state('progress100', style({
                width: '100%'
            })),

            transition('* => progress0', animate('0s ease')),
            transition('* => progress10', animate('0.3s ease-in')),
            transition('* => progress20', animate('0.5s ease-in')),
            transition('* => progress30', animate('0.5s ease-in')),
            transition('* => progress50', animate('0.5s ease-in')),
            transition('* => progress90', animate('0.9s ease-in')),
            transition('* => progress100', animate('1s ease-out')),
        ])
    ]
})

export class AppComponent {
    progressState:string;

    constructor(private busyNotificationService:BusyNotificationService) {
        busyNotificationService.applicationBusyTurnOnOff$.subscribe(this.gotNotification.bind(this));
    }

    gotNotification(notify:BusyNotifyConfig):void {
        if (!notify.state) {
            this.stopBusyAnimation();
            return
        }

        console.log(notify.progress);
        this.upProgress(notify.progress);
    }

    upProgress(progress:number):void {
        if (progress >= 100) {
            this.progressState = "progress100";
        } else if (progress <= 0) {
            this.progressState = "progress0";
        } else {
            let roundProgressValue = Math.round(progress / 10) * 10;
            this.progressState = "progress" + roundProgressValue;
        }
    }

    stopBusyAnimation():void {
        this.progressState = 'progress0';
    }
}