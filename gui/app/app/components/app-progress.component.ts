/**
 * Created by bglebov on 04.10.2016.
 */

import {
    Component,
    trigger, style, state, transition, animate, group, ChangeDetectorRef
} from "@angular/core";
import {BusyNotificationService, ProgressMessage} from "../services/app-notification.service";
import {FlashProgressMessage} from "../services/app-notification.service";

@Component({
    selector: 'app-progress',
    styleUrls: ['css/app-progress.component.css'],
    animations: [
        trigger('progressAnimation', [
            state('progress0', style({
                width: '0',
                opacity: 1
            })),

            state('progress10', style({
                width: '10%'
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

            transition('* => progress10', animate('0.3s ease-in')),
            transition('* => progress20', animate('0.3s ease-in')),
            transition('* => progress30', animate('0.3s ease-in')),
            transition('* => progress40', animate('0.3s ease-in')),
            transition('* => progress50', animate('0.3s ease-in')),
            transition('* => progress60', animate('0.3s ease-in')),
            transition('* => progress70', animate('0.3s ease-in')),
            transition('* => progress80', animate('0.3s ease-in')),
            transition('* => progress90', animate('0.3s ease-in')),
            transition('* => progress100', [
                group([
                    animate('800ms ease-out', style({
                        width: '100%'
                    })),
                    animate('0.3s 1s ease-in', style({
                        opacity: 0
                    }))
                ])
            ]),
        ])
    ],
    template: `<div class="loading-progress"
                    [@progressAnimation]="progressState"></div>`,

})
export class AppProgressComponent {
    public progressState:string;

    constructor(private busyNotificationService:BusyNotificationService, private cd:ChangeDetectorRef) {
        busyNotificationService.applicationBusyTurnOnOff$.subscribe(this.gotNotification.bind(this));
    }

    gotNotification(notify:any):void {
        if ((<ProgressMessage>notify).progress != null) {
            this.upProgress((<ProgressMessage>notify).progress);
        } else if ((<FlashProgressMessage>notify).flash != null) {
            console.log('flash');
            this.progressState = "flash";
        }

        this.cd.detectChanges();
    }

    upProgress(progress:number):void {
        if (progress <= 0 || progress > 100) {
            this.progressState = "progress0";
        } else {
            let roundProgressValue = Math.round(progress / 10) * 10;
            this.progressState = "progress" + roundProgressValue;
        }
    }

}