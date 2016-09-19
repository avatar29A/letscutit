/**
 * Created by warlock on 18.09.16.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {CuttingComponent} from "./cutting.component"

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, CuttingComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}