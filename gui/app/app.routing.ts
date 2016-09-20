/**
 * Created by warlock on 20.09.16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';

import {CuttingComponent} from './cutting/cutting.component';

//noinspection TypeScriptValidateTypes
const appRoutes:Routes = [
    {
        path: 'trends',
        component: CuttingComponent
    }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);