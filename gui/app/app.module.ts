/**
 * Created by warlock on 18.09.16.
 */

import {NgModule, Type} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {CuttingComponent} from "./cutting/cutting.component"
import {NavigationComponent} from "./navigation/navigation.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, CuttingComponent, NavigationComponent],
    bootstrap: [AppComponent]
})

export class AppModule extends Type{
}