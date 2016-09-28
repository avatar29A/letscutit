/**
 * Created by warlock on 20.09.16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {DropboxComponent} from "./dropbox/dropbox.component";
import {CutterComponent} from "./cutter/cutter.component";
import {TrendsComponent} from "./trends/trends.component";
import {ApiComponent} from "./api/api.component";
import {AboutComponent} from "./about/about.component";
import {Error404Component} from "./errors/error404.component"

//noinspection TypeScriptValidateTypes
const appRoutes:Routes = [
    {
        path: '',
        component: CutterComponent
    },
    {
        path: 'new',
        component: CutterComponent
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