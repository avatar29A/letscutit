/**
 * Created by bglebov on 20.09.2016.
 */

import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'cutter',
    templateUrl: 'app/cutter/cutter.template.html'
})

export class CutterComponent implements OnInit {
    constructor() {
    }

    ngOnInit():void {
        console.log("Cutter is loaded");
    }
}