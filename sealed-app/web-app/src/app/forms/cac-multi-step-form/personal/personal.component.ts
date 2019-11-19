import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import { Personal } from "../../../models/Personal";
import { CacFormDataService }     from '../../../models/formData.service';
import { RegistrationType } from 'src/app/shared/enums';

@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
    title = 'Please tell us about yourself.';
    personal: Personal;
    form: any;
    public categories  =  Object.values(RegistrationType);
   
    
    constructor(private router: Router, private formDataService: CacFormDataService) {
    }

    ngOnInit() {
        this.personal = this.formDataService.getPersonal();
        console.log('Personal feature loaded!');
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
            
        this.formDataService.setPersonal(this.personal);
        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['/cac/company']);
        }
    }

    
}


