import { MARITAL_STATUS } from 'src/app/shared/enums';
import { Helpers } from './../../../shared/Helpers';
import { Component, OnInit } from '@angular/core';
import { WillPersonal } from "src/app/models/WillPersonal";
import { Person } from "src/app/models/Person";
import { Router } from '@angular/router';
import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.component.html',
  styleUrls: ['./guardians.component.scss']
})
export class GuardiansComponent implements OnInit {
  title = '';
  guardians: Person[] = [];
  personal: WillPersonal;
  form: FormGroup;

  constructor(private toastr: ToastrService,private router: Router, private formDataService: WillFormDataService, private fb :  FormBuilder) {
  }
  ngOnInit() {
    this.personal = this.formDataService.getPersonal();
    this.guardians = this.formDataService.getGuardians();

     this.title = `${this.personal.Marital_Status} ${this.personal.gender} ${this.personal.IsHaveChildren ?   this.personal.IsHaveMinorChildren ? "With Children Including Minors" : "With Children"  : "" }`;
    
     this.form = this.fb.group({
         guardians : this.fb.array([])
    });
     this.getGuardians(this.personal)
        
    }


    removeGuardian(index : number)
    {
      if(this.guards.controls.length > 1)
        this.guards.removeAt(index);
        else
        {
           this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Have at least A Child', '', {
               timeOut: 8000,
               closeButton: true,
               enableHtml: true,
               toastClass: "alert alert-warning alert-with-icon",
               positionClass: 'toast-top-right'
             });
        }
    }

    get guards() { return this.form.get('guardians') as FormArray; }
    
    getGuardians(info: WillPersonal) {
      if (info.IsHaveMinorChildren) {
        if (this.guardians.length < 1)
          this.addGuardian();
        else {
          this.guardians.forEach(guard => {
            console.log(guard);
            this.guards.push(this.fb.group({
              name: [guard.name, Validators.required],
              contact: [guard.contact],
            }));
          });
        }
      }
    }


   addGuardian() {
    this.guards.push(this.fb.group({
       name: ['', Validators.required],
      contact: [''],
    }));
   
  }

  save(validate : boolean = true): boolean {
    if (validate && !this.form.valid) {
        return false;
    }


    this.guardians = Helpers.getFormArrayValues(this.guards);
    this.formDataService.setGuardians(this.guardians);
    return true;
}

goToPrevious() {
    if (this.save(false)) {
        // Navigate to the personal page
        if(this.personal.Marital_Status !== MARITAL_STATUS.MARRIED)
        this.router.navigate(['/will/personal']);
        else
        this.router.navigate(['/will/spouse']);
    }
}

goToNext() {
    if (this.save()) {
        // Navigate to the address page
        this.router.navigate(['/will/children']);
    }

}



}
