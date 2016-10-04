/**
 * Created by warlock on 18.09.16.
 */

import {
    Component,

} from "@angular/core"
import {BusyNotificationService} from "./services/app-notification.service";

@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/app/app.template.html',
    styleUrls: ['css/app.component.css'],
    providers: [BusyNotificationService]
})
export class AppComponent {

}