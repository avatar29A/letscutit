/**
 * Created by bglebov on 20.09.2016.
 */

import {Component} from "@angular/core"
import {Router} from "@angular/router"

@Component({
    selector: 'navigation',
    templateUrl: 'app/components/navigation/navigation.template.html',
    styleUrls: ['app/components/navigation/navigation.component.css']
})
export class NavigationComponent {

    constructor(private router:Router) {}
}