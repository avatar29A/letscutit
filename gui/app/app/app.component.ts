/**
 * Created by warlock on 18.09.16.
 */

import {
    Component, ChangeDetectorRef,

} from "@angular/core"
import {BusyNotificationService, IAppProgressMessage, AppBusySpinnerMessage} from "./services/app-notification.service";

@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/app/app.template.html',
    styleUrls: ['css/app.component.css'],
    providers: [BusyNotificationService]
})
export class AppComponent {
    isAwaiterShowed:boolean = false;

    constructor(private busyNotification:BusyNotificationService, private cd: ChangeDetectorRef) {
        busyNotification.applicationBusyTurnOnOff$.subscribe(this.handleBusyNotificationMessages.bind(this));
    }

    private handleBusyNotificationMessages(message:IAppProgressMessage):void {
        if ((<AppBusySpinnerMessage>message).isNeedShow == null) {
            return
        }

        this.isAwaiterShowed = (<AppBusySpinnerMessage>message).isNeedShow;
        this.cd.detectChanges();
    }
}