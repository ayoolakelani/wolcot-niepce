import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { WillService } from './../../../services/will/will.service';
import { WillFormData } from './../../../models/WillFormData';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CacFormData } from 'src/app/models/FormData';
import { CacRequestStatus, WillRequestStatus } from 'src/app/shared/enums';
import { throwError } from 'rxjs';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-will-preview',
  templateUrl: './will-preview.component.html',
  styleUrls: ['./will-preview.component.scss']
})
export class WillPreviewComponent implements OnInit {
  title = 'Thanks for staying tuned!';
  formData: WillFormData;
  isFormValid: boolean = false;
   userId : string;
  
  constructor(private formDataService: WillFormDataService,private router: Router, private auth : AuthService, private willService :  WillService) {
  }



  goToPrevious() {
      this.router.navigate(['/will/beneficiaries']);
   }

  ngOnInit() {
      this.formData = this.formDataService.getFormData();
      this.isFormValid = this.formDataService.isFormValid();
      console.log(this.formData.guardians);
        this.auth.AppUser$.subscribe(a => this.userId = a.uid);
       
      
  }

  async submit() {     
     
      await this.saveRequest(this.formData);
     // this.formData = this.formDataService.resetFormData();
     // this.isFormValid = false;
  }


  async saveRequest(request : WillFormData) {
      
           request.userId = this.userId;
           request.requestId = Guid.raw()
              request.status = WillRequestStatus.REQUESTED;
                console.log(request);
           if(request.userId ===undefined)
           throwError("An error occured please try again");
            this.willService.CreateRequest({...request});
            this.formData = this.formDataService.resetFormData();
             this.isFormValid = false;
             this.router.navigate(["/will-management"]);
      

  
  }
}
