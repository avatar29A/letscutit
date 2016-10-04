/**
 * Created by bglebov on 04.10.2016.
 */

import {
    Component,
    trigger, style, state, transition, animate, group
} from "@angular/core";
import {BusyNotificationService, IAppProgressMessage, ProgressMessage} from "../services/app-notification.service";
import {ResetMessage} from "../services/app-notification.service";
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

            state('progress20', style({
                width: '20%'
            })),

            transition('* => progress20', animate('0.3s ease-in')),
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

    constructor(private busyNotificationService:BusyNotificationService) {
        busyNotificationService.applicationBusyTurnOnOff$.subscribe(this.gotNotification.bind(this));
    }

    gotNotification(notify:IAppProgressMessage):void {
        if ((<ProgressMessage>notify).progress != null) {
            this.upProgress((<ProgressMessage>notify).progress);
        } else if ((<FlashProgressMessage>notify).flash != null) {
            console.log('flash');
            this.progressState = "flash";
        }
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