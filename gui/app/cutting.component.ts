/**
 * Created by warlock on 19.09.16.
 */

import {Component, Input} from "@angular/core"
import {Cutting} from "./model/cutting";

@Component({
    selector: 'my-cutting',
    template: `
        <h2>{{cutting.title}} details!</h2>
        <div><label>id: </label>{{cutting.id}}</div>
       `
})

export class CuttingComponent {
    @Input()
    cutting: Cutting;
}