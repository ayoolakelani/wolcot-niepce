import { SpouseComponent } from './spouse/spouse.component';
import { WillAppRoutes } from './will-multi-step-form-routing';
import { WillPersonalComponent } from './personal/will-personal.component';
import { WillPreviewComponent } from './will-preview/will-preview.component';
import { WillBeneficiariesComponent } from './will-beneficiaries/will-beneficiaries.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WillFormServiceModule } from './WillFormServiceModule';
import { GuardiansComponent } from './guardians/guardians.component';
import { ChildrenComponent } from './children/children.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WillAppRoutes),
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        FormsModule,
        WillFormServiceModule
    ],
    declarations: [WillPersonalComponent, SpouseComponent , VideoUploadComponent, WillBeneficiariesComponent, WillPreviewComponent, GuardiansComponent, ChildrenComponent],
   
})
export class WillMultiStepFormModule {
}



