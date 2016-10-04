/**
 * Created by warlock on 18.09.16.
 */

import {Component, OnInit, AnimationTransitionEvent
    trigger, style, state, transition, animate, keyframes} from "@angular/core"
import {BusyNotificationService} from "./services/busynotification.service";

const BusyIndicatorHide = "busy-hide";
const BusyIndicatorShow = "busy-show";


@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/app/app.template.html',
    styleUrls: ['css/app.component.css'],
    providers: [BusyNotificationService],
    animations: [
        trigger('busyIndicatorState', [
            state(BusyIndicatorHide, style({
                width: 0
            })),

            state(BusyIndicatorShow, style({
                width: '100%'
            })),

            transition("busy-hide => busy-show", animate('1500ms ease-in')),
            transition("busy-show => busy-hide", animate('0ms ease')),
        ])
    ]
})

export class AppComponent implements OnInit {
    busyState:string = BusyIndicatorHide;

    constructor(private busyNotificationService:BusyNotificationService) {
        busyNotificationService.applicationBusyTurnOnOff$.subscribe(config => {

        });
    }

    ngOnInit():void {
        this.startBusyAnimation();
    }

    startBusyAnimation():void {
        setTimeout(()=> this.busyState = BusyIndicatorShow, 1000);
    }

    stopBusyAnimation(event:AnimationTransitionEvent):void {
        setTimeout(()=> this.busyState = event.fromState, 3000);
    }
}