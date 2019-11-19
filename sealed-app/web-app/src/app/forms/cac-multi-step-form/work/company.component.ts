import { CompanyType } from '../../../shared/enums';
import { Company } from "../../../models/Company";
import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import { CacFormDataService }     from '../../../models/formData.service';

@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: './company.component.html'
})

export class CompanyComponent implements OnInit {
    title = 'Please Provide Company Information';
    company: Company;
    form: any;
    public categories  =  Object.values(CompanyType);
    
    constructor(private router: Router, private formDataService: CacFormDataService) {
    }

    ngOnInit() {
        this.company = this.formDataService.getCompany();
        console.log('Work feature loaded!');
    }

    save(form: any, validate : boolean = true): boolean {
        if (validate && !form.valid) {
            return false;
        }
        this.formDataService.setCompany(this.company);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form, false)) {
            // Navigate to the personal page
            this.router.navigate(['/cac/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the address page
            this.router.navigate(['/cac/companyinfo']);
        }
    }
}