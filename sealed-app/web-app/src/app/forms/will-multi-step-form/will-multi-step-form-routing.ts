import { SpouseComponent } from './spouse/spouse.component';
import { ChildrenComponent } from './children/children.component';
import { WillBeneficiariesComponent } from './will-beneficiaries/will-beneficiaries.component';
import { Routes } from '@angular/router';
import { WillPersonalComponent } from './personal/will-personal.component';
import { WillWorkflowGuard } from './workflow/will-workflow-guard.service';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { WillPreviewComponent } from './will-preview/will-preview.component';
import { GuardiansComponent } from './guardians/guardians.component';










export const WillAppRoutes: Routes = [
    // 1st Route
    { path: 'personal',  component: WillPersonalComponent },
    
    // { path: 'spouse',  component: SpouseComponent, canActivate: [WillWorkflowGuard] },

    // { path: 'guardians',  component: GuardiansComponent, canActivate: [WillWorkflowGuard] },
    // // 3rd Route
    // { path: 'children',  component: ChildrenComponent , canActivate: [WillWorkflowGuard] },
    // 3rd Route
    // 2nd Route
    { path: 'beneficiaries',  component: WillBeneficiariesComponent, canActivate: [WillWorkflowGuard] },
    // 3rd Route
    { path: 'videoupload',  component: VideoUploadComponent, canActivate: [WillWorkflowGuard] },
    // 4th Route
    { path: 'result',  component: WillPreviewComponent, canActivate: [WillWorkflowGuard] },
    // // 5th Route
    { path: '',   redirectTo: 'personal', pathMatch: 'full' },
    // // 6th Route
    { path: '**', component: WillPersonalComponent }
];