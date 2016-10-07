/**
 * Created by warlock on 20.09.16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {TrendsComponent} from "./trends/trends.component";
import {ApiComponent} from "./api/api.component";
import {AboutComponent} from "./about/about.component";
import {Error404Component} from "./errors/error404.component"
import {AudioEditorComponent} from "./editors/audio/audio-editor.component";

//noinspection TypeScriptValidateTypes
const appRoutes:Routes = [
    {
        path: '',
        component: AudioEditorComponent
    },
    {
        path: 'new',
        component: AudioEditorComponent
    },
    {
        path: 'trends',
        component: TrendsComponent
    },
    {
        path: 'api',
        component: ApiComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: "**",
        component: Error404Component
    }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);