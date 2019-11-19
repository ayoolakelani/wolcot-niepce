
import { Routes } from '@angular/router';

import { PersonalComponent }    from './personal/personal.component';
import { CompanyComponent as CompanyComponent }        from './work/company.component';

import { ResultComponent as PreviewComponent }      from './result/result.component';

import { CacWorkflowGuard }        from './workflow/workflow-guard.service';
import { CompanyInfoComponent } from './address/companyinfo.component';


export const CacAppRoutes: Routes = [
    // 1st Route
    { path: 'personal',  component: PersonalComponent },
    // 2nd Route
    { path: 'company',  component: CompanyComponent, canActivate: [CacWorkflowGuard] },
    // 3rd Route
    { path: 'companyinfo',  component: CompanyInfoComponent, canActivate: [CacWorkflowGuard] },
    // 4th Route
    { path: 'result',  component: PreviewComponent, canActivate: [CacWorkflowGuard] },
    // // 5th Route
    { path: '',   redirectTo: 'personal', pathMatch: 'full' },
    // // 6th Route
    { path: '**', component: PersonalComponent }
];

// @NgModule({
//   imports: [RouterModule.forChild(appRoutes)],
//   exports: [RouterModule],
//   providers: [WorkflowGuard]
// })

//export class CacMultiStepFormRoutingModule {}