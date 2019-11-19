import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { CacFormDataService } from '../../models/formData.service';
import { CacFormData } from '../../models/FormData';
import {Guid} from "guid-typescript"

@Component({
  selector: 'app-cac-multi-step-form',
  templateUrl: './cac-multi-step-form.component.html',
  styleUrls: ['./cac-multi-step-form.component.scss']
})


export class CacMultiStepFormComponent implements OnInit  {
  title = 'Business Registeration Multi-Step Wizard';
  @Input() formData :  CacFormData;
  
  constructor(private formDataService: CacFormDataService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.LoggedInUser.subscribe(a => this.formData.requestId = Guid.raw());
      this.formData = this.formDataService.getFormData();
     console.log(this.title + ' loaded!');
  }
}
