/**
 * Created by warlock on 18.09.16.
 */

import {
    Component, ChangeDetectorRef,

} from "@angular/core"
import {BusyNotificationService, AppBusySpinnerMessage} from "../../services/app/appbusy-notification.service";


@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/pages/app/app.template.html',
    styleUrls: ['app/pages/app/app.component.css'],
    providers: [BusyNotificationService]
})
export class AppComponent {
    isAwaiterShowed:boolean = false;

    constructor(private busyNotification:BusyNotificationService, private cd: ChangeDetectorRef) {
        busyNotification.applicationBusyTurnOnOff$.subscribe(this.handleBusyNotificationMessages.bind(this));
    }

    private handleBusyNotificationMessages(message:any):void {
        if ((<AppBusySpinnerMessage>message).isNeedShow == null) {
            return
        }

        this.isAwaiterShowed = (<AppBusySpinnerMessage>message).isNeedShow;
        this.cd.detectChanges();
    }
}