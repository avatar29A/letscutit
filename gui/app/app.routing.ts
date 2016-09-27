/**
 * Created by warlock on 20.09.16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {DropboxComponent} from "./dropbox/dropbox.component";
import {CutterComponent} from "./cutter/cutter.component";

//noinspection TypeScriptValidateTypes
const appRoutes: Routes = [
    {
        path: '',
        component: CutterComponent
    },
    {
        path: 'new',
        component: CutterComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);