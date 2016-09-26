/**
 * Created by warlock on 18.09.16.
 */

import {Component, OnInit} from "@angular/core"
import now = require("lodash/now");


@Component({
    selector: 'letscutit-app',
    templateUrl: 'app/app/app.template.html',
    styleUrls: ['css/app.css']
})

export class AppComponent implements OnInit {
    ngOnInit():void {
        console.log("APPLICATION is LAODED");
    }
}