/**
 * Created by Warlock on 02.10.2016.
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
var VisualiserComponent = (function () {
    function VisualiserComponent() {
    }
    VisualiserComponent.prototype.ngOnInit = function () {
        this._holst = document.getElementById('holst');
        this._holstCtx = this._holst.getContext("2d");
    };
    Object.defineProperty(VisualiserComponent.prototype, "frames", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    VisualiserComponent.prototype.draw = function () {
        var drawVisual = requestAnimationFrame(this.draw.bind(this));
        var width = this._holst.width;
        var height = this._holst.height;
        this._holstCtx.clearRect(0, 0, width, height);
        this._holstCtx.fillStyle = 'rgb(0, 0, 0)';
        this._holstCtx.fillRect(0, 0, width, height);
        var barWidth = (width / this.frames.length) * 2.5;
        var barHeight;
        var x = 0;
        for (var i = 0; i < this.frames.length; i++) {
            barHeight = this.frames[i] / 2;
            this._holstCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            this._holstCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight);
            x += barWidth + 1;
        }
    };
    VisualiserComponent = __decorate([
        core_1.Component({
            selector: 'wave-visualiser',
            template: '<canvas id="holst" width="800" height="600"></canvas>'
        }), 
        __metadata('design:paramtypes', [])
    ], VisualiserComponent);
    return VisualiserComponent;
}());
exports.VisualiserComponent = VisualiserComponent;
//# sourceMappingURL=visualiser.component.js.map