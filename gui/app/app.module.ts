/**
 * Created by warlock on 18.09.16.
 */

import {NgModule, Type} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {NavigationComponent} from "./navigation/navigation.component";

// Editor

import {DropboxComponent} from "./dropbox/dropbox.component";


import {TrendsComponent} from "./trends/trends.component";
import {ApiComponent} from "./api/api.component";
import {AboutComponent} from "./about/about.component";
import {Error404Component} from "./errors/error404.component";

import {routing} from "./app.routing";
import {AppProgressComponent} from "./app/components/app-progress.component";
import {AudioEditorComponent} from "./editors/audio/audio-editor.component";
import {VisualiserComponent} from "./editors/audio/visualiser/visualiser.component";


@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent,
        AppProgressComponent,
        DropboxComponent,
        AudioEditorComponent,
        VisualiserComponent,
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