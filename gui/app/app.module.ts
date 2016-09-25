/**
 * Created by warlock on 18.09.16.
 */

import {NgModule, Type} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {DropboxComponent} from "./dropbox/dropbox.component";
import {CutterComponent} from "./cutter/cutter.component";

import {routing} from "./app.routing";


@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent,
        DropboxComponent,
        CutterComponent,
        NavigationComponent],
    bootstrap: [AppComponent]
})

export class AppModule extends Type{
}