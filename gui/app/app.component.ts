/**
 * Created by warlock on 18.09.16.
 */

import {Component} from "@angular/core"
import {Cutting} from "./model/cutting";

@Component({
    selector: 'letscutit-app',
    template: '<h1>{{title}}</h1><my-cutting [cutting]="cutting"></my-cutting>'
})

export class AppComponent {
    title = 'Letscut.it';
    cutting: Cutting = {
        id: "1",
        title: "Anacondaz - Бесит"
    };
}