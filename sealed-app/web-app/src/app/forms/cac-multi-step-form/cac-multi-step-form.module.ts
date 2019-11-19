import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  CacAppRoutes } from './cac-multi-step-form-routing';
import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';


import { CacNavbarComponent }    from './navbar/cac-form-navbar.component';

/* Feature Components */
import { PersonalComponent }  from './personal/personal.component';
import { CompanyComponent }      from './work/company.component';
import { CompanyInfoComponent }   from './address/companyinfo.component';
import { ResultComponent }    from './result/result.component';

/* Routing Module */


/* Shared Service */
import { CacFormDataService }    from '../../models/formData.service';
import { CacWorkflowService }    from './workflow/workflow.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CacWorkflowGuard } from './workflow/workflow-guard.service';
import { CacNavigationModule } from './cac-navigation.module';



@NgModule({
    imports:      [ 
                    CommonModule,
                    RouterModule.forChild(CacAppRoutes),
                    NgbModule,
                    FormsModule,
                   // CacNavigationModule
                   // CacMultiStepFormRoutingModule
                  ],

                  declarations: [PersonalComponent, CompanyComponent, CompanyInfoComponent, ResultComponent ],
  
})
export class CacMultiStepFormModule { }




