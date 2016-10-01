/**
 * Created by warlock on 18.09.16.
 */

import {NgModule, Type} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {DropboxComponent} from "./dropbox/dropbox.component";
import {AudioEditorComponent} from "./editor/editor.component";
import {TrendsComponent} from "./trends/trends.component";
import {ApiComponent} from "./api/api.component";
import {AboutComponent} from "./about/about.component";
import {Error404Component} from "./errors/error404.component";

import {routing} from "./app.routing";


@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent,
        DropboxComponent,
        AudioEditorComponent,
        NavigationComponent,
        ApiComponent,
        TrendsComponent,
        AboutComponent,
        Error404Component
    ],
    bootstrap: [AppComponent]
})

export class AppModule extends Type{
}