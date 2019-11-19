import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WillService } from './../../../services/will/will.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrationType, Gender, MARITAL_STATUS } from 'src/app/shared/enums';
import { WillPersonal } from "src/app/models/WillPersonal";
import { first } from 'rxjs/internal/operators/first';
import { take, map } from 'rxjs/operators';
import { WillRequest } from 'src/app/models/WillFormData';

@Component({
    selector: 'mt-wizard-will-personal'
    , templateUrl: './will-personal.component.html'
})

export class WillPersonalComponent implements OnInit, OnChanges {
 
    title = 'Please tell us about yourself.';
    personal: WillPersonal;
    form: FormGroup;
    public categories = Object.values(RegistrationType);
    public maritalstatuses = Object.values(MARITAL_STATUS);
    public genders = Object.values(Gender);
    requests: WillRequest[] = [];
    userId: string;
    requests$: any;
    data: WillRequest;
    loaded: boolean;

    constructor(private router: Router, private auth : AuthService, private willService : WillService ,private formDataService: WillFormDataService, private fb: FormBuilder) {
       
    }

    ngOnChanges(changes: SimpleChanges): void {
  
    }
 
     ngOnInit() {

      
       this.personal = this.formDataService.getPersonal();
         this.form = this.fb.group({
            firstName: [this.personal.firstName, Validators.required],
            lastName: [this.personal.lastName, Validators.required],
            phone: [this.personal.phone, Validators.required],
            email: [this.personal.email, [Validators.required, Validators.email]],
            gender: [this.personal.gender, Validators.required],
            Marital_Status: [this.personal.Marital_Status, Validators.required],
            IsHaveChildren: [this.personal.IsHaveChildren, Validators.required],
            IsHaveMinorChildren: [this.personal.IsHaveMinorChildren],
        });


    }


    get firstName() { return this.form.get('firstName'); }
    get lastName() { return this.form.get('lastName'); }
    get phone() { return this.form.get('phone'); }
    get email() { return this.form.get('email'); }
    get gender() { return this.form.get('gender'); }
    get Marital_Status() { return this.form.get('Marital_Status'); }
    get IsHaveChildren() { return this.form.get('IsHaveChildren'); }
    get IsHaveMinorChildren() { return this.form.get('IsHaveMinorChildren'); }

    save(): boolean {
        if (!this.form.valid) {
            return false;
        }
        this.personal = { ...this.form.value };
        console.log(this.personal);
        this.formDataService.setPersonal(this.personal);
        return true;
    }

    goToNext(form: any) {
        if (this.save()) {
            let route = [];

            // if (this.personal.Marital_Status == MARITAL_STATUS.MARRIED)
            //     route = ['/will/spouse'];
            // else {

            //     if (this.personal.IsHaveChildren) 
            //     {    // Navigate to the work page
            //         if (this.personal.IsHaveMinorChildren)
            //             route = ['/will/guardians'];
            //         else
            //             route = ['/will/children'];
            //     }
            //     else
            //         route = ['/will/beneficiaries'];


            // }

            route = ['/will/beneficiaries'];
            console.log(route);
            this.router.navigate(route);
        }
    }


}


