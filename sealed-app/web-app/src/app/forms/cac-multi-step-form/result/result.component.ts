import { CacRequestStatus } from './../../../shared/enums';
import { CacRequest } from './../../../models/FormData';
import { CacCompanyInformation, CompanyInformation } from './../../../models/CompanyInformation';
import { CacService } from './../../../services/cac/cac.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, Input }   from '@angular/core';

import { CacFormData }                   from '../../../models/FormData';
import { CacFormDataService }            from '../../../models/formData.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { pipe, throwError } from 'rxjs';

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Thanks for staying tuned!';
    formData: CacFormData;
    isFormValid: boolean = false;
     userId : string;
    
    constructor(private formDataService: CacFormDataService,private router: Router, private auth : AuthService, private cacService :  CacService) {
    }

  

    goToPrevious() {
        this.router.navigate(['/cac/companyinfo']);
     }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
          this.auth.AppUser$.subscribe(a => this.userId = a.uid);
         
        
    }

    async submit() {     
       
        await this.saveRequest(this.formData);
       // this.formData = this.formDataService.resetFormData();
       // this.isFormValid = false;
    }


    async saveRequest(request : CacFormData) {
        
        
        for(let info of  request.companyinfo.directors)
        {
           delete info.files.file;
        }

        if(request.companyinfo.secetaries && request.companyinfo.secetaries.length > 0)
        {
            for(let info of request.companyinfo.secetaries)
            {
            delete info.files.file;
            }
       }

       
                request.userId = this.userId;
                request.company.approvedName = request.company.name1;
                request.status = CacRequestStatus.REQUESTED;
                  console.log(request);
             if(request.userId ===undefined)
             throwError("An error occured please try again");
              this.cacService.CreateRequest({...request});
              this.formData = this.formDataService.resetFormData();
               this.isFormValid = false;
               this.router.navigate(["/business-registration"]);
        

    
    }
}
