
import { ToastrService } from 'ngx-toastr';
import { Gift } from "./../../../models/Gift";
import { GiftBeneficiary } from "./../../../models/GiftBeneficiary";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WillPersonal } from "src/app/models/WillPersonal";
import { Person } from "src/app/models/Person";
import { GiftType } from 'src/app/shared/enums';
import { Spouse } from 'src/app/models/Spouse';

@Component({
  selector: 'app-spouse',
  templateUrl: './spouse.component.html',
  styleUrls: ['./spouse.component.scss']
})
export class SpouseComponent implements OnInit {
  title: string;
  form: FormGroup;
  personal: WillPersonal;
  spouse : Spouse;
  public giftTypes = Object.keys(GiftType);
 

  constructor(private router: Router, private formDataService: WillFormDataService, private fb :  FormBuilder,private toastr : ToastrService) {
    
  }
  ngOnInit() {
    this.personal = this.formDataService.getPersonal();
      this.title = `${this.personal.Marital_Status} ${this.personal.gender} ${this.personal.IsHaveChildren ?   this.personal.IsHaveMinorChildren ? "With Children Including Minors" : "With Children"  : "Without Children" }`;
       this.spouse = this.formDataService.getSpouse() || {name : "" , benefits : [] , id : undefined, description : "", isGiveAll : false , isExcluded : false };
     
     
     
     
       this.form = this.fb.group({
        name: [this.spouse.name, Validators.required],
        isGiveAll : [this.spouse.isGiveAll, Validators.required],
        isExcluded : [this.spouse.isExcluded, Validators.required],
        contact: [this.spouse.contact],
        benefits : this.getBenefits(this.spouse.benefits || []),
        description : [this.spouse.description]
  
    });
    this.setGiftValidation();
    
  }

  getBenefits(gifts : Gift[]) : FormArray {
    if(!this.spouse.isGiveAll || !this.spouse.isExcluded)
    {
    let arr = this.fb.array([]);
    if (gifts.length > 0) {
      gifts.forEach(gift => {
        arr.push(this.fb.group({
          type: [gift.type, Validators.required],
          description: [gift.description, Validators.required],
        }))

      });
    }
    else {
      arr.push(this.fb.group({
        type: [null],
        description: [""],
      }));
    }

    return arr;
  }
  }

  get name() { return this.form.get('name'); }
  get benefits() { return this.form.get('benefits') as FormArray; }
  get isGiveAll() { return this.form.get('isGiveAll') as FormControl; }
  get isExcluded() { return this.form.get('isExcluded') as FormControl; }

  public setGiftValidation() {

    if(this.isExcluded.value || this.isGiveAll.value)
    {
      console.log("clear validations")
      this.benefits.controls.forEach(c => {
        c.get('type').clearValidators();
        c.get('type').updateValueAndValidity();
        c.get('description').clearValidators();
        c.get('description').updateValueAndValidity();
        c.clearValidators();
        c.updateValueAndValidity();

      });
      this.benefits.clearValidators();
       this.benefits.updateValueAndValidity();
    }
 
 }
 
  removeGift(index : number)
  {
    if(this.benefits.controls.length > 1 && !this.isGiveAll)
      this.benefits.removeAt(index);
      else
      {
         this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Include A Gift or Exclude Your Spouse', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-warning alert-with-icon",
             positionClass: 'toast-top-right'
           });
      }
  } 
  
  addGift() {
  this.benefits.push(this.fb.group({
    type: [null, Validators.required],
    description: ["", Validators.required],
  }));
 
}


  save(validate : boolean = true): boolean {
    if (validate && !this.form.valid) {
        return false;
    }

    this.spouse = { ...this.form.value };
    this.formDataService.setSpouse(this.spouse);
    return true;
}

goToPrevious() {
  if (this.save(false)) {
      // Navigate to the personal page
      
      this.router.navigate(['/will/personal']);
  }
}

  

  goToNext() {
    if (this.save()) {
        let route = [];

        if (this.personal.IsHaveChildren) {    // Navigate to the work page
            if (this.personal.IsHaveMinorChildren)
                route = ['/will/guardians'];
            else
                route = ['/will/children'];
        }
        else
            route = ['/will/beneficiaries'];


        
        this.router.navigate(route);
    }
}

}
