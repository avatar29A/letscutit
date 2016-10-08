/**
 * Created by warlock on 20.09.16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {Error404Component} from "./errors/error404.component"
import {AudioEditorComponent} from "./pages/editors/audio/audio-editor.component";
import {TrendsComponent} from "./pages/trends/trends.component";
import {ApiComponent} from "./pages/api/api.component";
import {AboutComponent} from "./pages/about/about.component";


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