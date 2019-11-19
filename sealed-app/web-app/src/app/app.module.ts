

import { WillService } from './services/will/will.service';
import { CacService } from './services/cac/cac.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { NavigationModule } from './navigation/navigation.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { LoginComponent } from './login/login.component';


import { CacWorkflowService } from './forms/cac-multi-step-form/workflow/workflow.service';
import { CacWorkflowGuard } from './forms/cac-multi-step-form/workflow/workflow-guard.service';
import { UploadFileService } from './services/fileupload/upload-file.service';
import { RegisterComponent } from './register/register.component';
import { AdminCacComponent } from './admin/admin-cac/admin-cac.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    ToastrModule.forRoot(),

  ],
  declarations: [
      AppComponent,
       LoginComponent,
       AdminLayoutComponent,
       RegisterComponent,
       AdminCacComponent,
       LogoutComponent,
  ],

  providers: [

    AuthGuard,
    AuthService,
    UserService,
    AdminAuthGuard,
    CacWorkflowGuard,
    { provide: CacFormDataService, useClass: CacFormDataService },
    { provide: CacWorkflowService, useClass: CacWorkflowService },
    { provide: UploadFileService, useClass: UploadFileService },

    { provide: CacService, useClass: CacService },
    { provide: WillService, useClass: WillService },
    { provide: WillFormDataService, useClass: WillFormDataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
