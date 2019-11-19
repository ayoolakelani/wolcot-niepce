import { CacNavbarComponent } from './navbar/cac-form-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
   
    CacNavbarComponent,
  
  ],
  exports: [
   
    CacNavbarComponent,
 
  ]
})
export class CacNavigationModule { }
