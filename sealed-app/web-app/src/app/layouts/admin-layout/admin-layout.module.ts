import { WillComponent } from './../../will/will.component';
import { WillMultiStepFormComponent } from './../../forms/will-multi-step-form/will-multi-step-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CacMultiStepFormComponent } from 'src/app/forms/cac-multi-step-form/cac-multi-step-form.component';
import { CacComponent } from 'src/app/cac/cac.component';
import { CacNavigationModule } from 'src/app/forms/cac-multi-step-form/cac-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    CacNavigationModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    // TableListComponent,
    // UpgradeComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
  //  NotificationsComponent,
    CacComponent,
    WillComponent,
    CacMultiStepFormComponent,
    WillMultiStepFormComponent
  ]
})

export class AdminLayoutModule {}
