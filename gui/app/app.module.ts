/**
 * Created by warlock on 18.09.16.
 */

import { NgModule, Type } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";


// Editor

import { Error404Component } from "./errors/error404.component";
import { routing } from "./app.routing";
import { AppComponent } from "./pages/app/app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { DropboxComponent } from "./components/dropbox/dropbox.component";
import { AudioEditorComponent } from "./pages/editors/audio/audio-editor.component";
import { ApiComponent } from "./pages/api/api.component";
import { TrendsComponent } from "./pages/trends/trends.component";
import { AboutComponent } from "./pages/about/about.component";
import { AppProgressComponent } from "./components/app/app-progress.component";
import { WaveformComponent } from "./components/editors/audio/waveform.component";
import { ConsoleComponent } from "./components/editors/audio/console.component";


@NgModule({
    imports: [BrowserModule, routing, HttpModule],
    declarations: [AppComponent,
        AppProgressComponent,
        DropboxComponent,
        AudioEditorComponent,
        WaveformComponent,
        ConsoleComponent,
        NavigationComponent,
        ApiComponent,
        TrendsComponent,
        AboutComponent,
        Error404Component
    ],
    bootstrap: [AppComponent]
})

export class AppModule extends Type {
}
