/**
 * Created by warlock on 19.09.16.
 */

import {Component, Input} from "@angular/core"
import {Cutting} from "./model/cutting";
import {Router} from "@angular/router";

@Component({
    selector: 'my-cutting',
    templateUrl: 'app/cutting/cutting.template.html'
})

export class CuttingComponent {
    @Input()
    cutting: Cutting;

    constructor(private router: Router) {}
}