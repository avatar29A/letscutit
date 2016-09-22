/**
 * Created by bglebov on 20.09.2016.
 */

import {Component} from "@angular/core"
import * as _ from "lodash"

@Component({
    selector: 'navigation',
    templateUrl: 'app/navigation/navigation.template.html'
})
export class NavigationComponent{
    
}



function lodashTestSum(collection: [number]) {
     return _.reduce(collection, (reduct, el) => reduct + el, 0);
}

console.log(lodashTestSum([1,2,3,4]));