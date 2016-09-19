/**
 * Created by warlock on 19.09.16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cutting_1 = require("./model/cutting");
var CuttingComponent = (function () {
    function CuttingComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cutting_1.Cutting)
    ], CuttingComponent.prototype, "cutting", void 0);
    CuttingComponent = __decorate([
        core_1.Component({
            selector: 'my-cutting',
            template: "\n        <h2>{{cutting.title}} details!</h2>\n        <div><label>id: </label>{{cutting.id}}</div>\n       "
        }), 
        __metadata('design:paramtypes', [])
    ], CuttingComponent);
    return CuttingComponent;
}());
exports.CuttingComponent = CuttingComponent;
//# sourceMappingURL=cutting.component.js.map