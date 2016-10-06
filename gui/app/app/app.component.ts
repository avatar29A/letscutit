/**
 * Created by warlock on 18.09.16.
 */

import {
    Component,

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

    constructor(private busyNotification:BusyNotificationService) {
        busyNotification.applicationBusyTurnOnOff$.subscribe(this.handleBusyNotificationMessages.bind(this));
    }

    private handleBusyNotificationMessages(message:IAppProgressMessage):void {
        if ((<AppBusySpinnerMessage>message).isNeedShow == null) {
            return
        }

        console.log("Before: " + this.isAwaiterShowed);
        this.isAwaiterShowed = (<AppBusySpinnerMessage>message).isNeedShow;
        console.log("Needed: " + this.isAwaiterShowed);
    }
}