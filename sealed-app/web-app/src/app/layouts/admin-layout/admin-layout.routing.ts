import { WillComponent } from './../../will/will.component';
import { WillMultiStepFormComponent } from './../../forms/will-multi-step-form/will-multi-step-form.component';
import { CacComponent } from './../../cac/cac.component';
import { AdminAuthGuard } from './../../admin-auth-guard.service';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AuthGuard } from 'src/app/auth-guard.service';
import { CacMultiStepFormComponent } from 'src/app/forms/cac-multi-step-form/cac-multi-step-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate : [AuthGuard]},
    { path: 'admin-dashboard',      component: DashboardComponent, canActivate : [AdminAuthGuard]}, 
    { path: 'user-profile',   component: UserProfileComponent, canActivate : [AuthGuard]}, 
    { path: 'business-registration',   component: CacComponent,  canActivate : [AuthGuard]},
    { path: 'will-management',   component: WillComponent,  canActivate : [AuthGuard]},
    {
      path: 'cac',
      component: CacMultiStepFormComponent,
      children: [
          {
            path: '', 
           loadChildren: 'src/app/forms/cac-multi-step-form/cac-multi-step-form.module#CacMultiStepFormModule'
    }]},
    {
      path: 'will',
      component: WillMultiStepFormComponent,
      children: [
          {
            path: '', 
           loadChildren: 'src/app/forms/will-multi-step-form/will-multi-step-form.module#WillMultiStepFormModule'
    }]},

];
