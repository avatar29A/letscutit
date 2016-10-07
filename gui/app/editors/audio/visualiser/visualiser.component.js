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
    Object.defineProperty(VisualiserComponent.prototype, "buffer", {
        get: function () {
            return this._data;
        },
        set: function (ab) {
            this._data = ab;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    VisualiserComponent.prototype.draw = function () {
        var drawVisual = requestAnimationFrame(this.draw.bind(this));
        var width = this._holst.width;
        var height = this._holst.height;
        var context = this._holstCtx;
        context.fillStyle = 'rgb(200, 200, 200)';
        context.fillRect(0, 0, width, height);
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(0, 0, 0)';
        // distance between to points (scale is equal an one second):
        var distance = (width * 1.0) / this.buffer.duration;
        var channel0 = this.buffer.getChannelData(0);
        var frameBound = 0;
        var frameSumValue = 0;
        var drownFrameAmount = 0;
        var averageValues = [];
        var x = 0;
        context.beginPath();
        for (var i = 0; i < channel0.length; i++) {
            frameBound += 1;
            frameSumValue += channel0[i];
            // Draw frame. Frame's value is equal average sum whole samples.
            if (frameBound === this.buffer.sampleRate - 1) {
                var frameAverageValue = (frameSumValue / this.buffer.sampleRate) * 100000;
                averageValues.push(frameAverageValue);
                var y = frameAverageValue + height / 2;
                if (drownFrameAmount === 0) {
                    context.moveTo(x, y);
                }
                else {
                    context.lineTo(x, y);
                }
                drownFrameAmount += 1;
                x += distance;
                // reset
                frameBound = 0;
                frameSumValue = 0;
            }
        }
        context.lineTo(this._holst.width, this._holst.height / 2);
        context.stroke();
        console.log(averageValues);
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