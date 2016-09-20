/**
 * Created by warlock on 20.09.16.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuttingComponent }      from './cutting.component';

const appRoutes: Routes = [
  {
    path: 'new',
    component: CuttingComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);