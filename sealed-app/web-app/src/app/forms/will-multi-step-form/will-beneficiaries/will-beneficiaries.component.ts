import { MARITAL_STATUS, Gender, BeneficiaryType } from './../../../shared/enums';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { Relationship, GiftType } from 'src/app/shared/enums';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { GiftBeneficiary, WillBeneficiary } from 'src/app/models/GiftBeneficiary';
import { Children } from 'src/app/models/Children';
import { WillPersonal } from 'src/app/models/WillPersonal';
import { Gift } from 'src/app/models/Gift';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'src/app/shared/Helpers';

 

@Component({
  selector: 'app-will-beneficiaries',
  templateUrl: './will-beneficiaries.component.html',
  styleUrls: ['./will-beneficiaries.component.scss']
})
export class WillBeneficiariesComponent implements OnInit {


  title = 'Will Beneficiary Details';
  public beneficiaries: WillBeneficiary[];
  public relationships = Object.keys(Relationship);
  public giftTypes = Object.keys(GiftType);
  public benTypes = Object.keys(Relationship);
  form : FormGroup;
  personal: WillPersonal;
  children: Children[];
  bengroup: FormGroup;
  


  constructor(private toastr: ToastrService,private router: Router, private formDataService: WillFormDataService, private fb :  FormBuilder) {
  }


  ngOnInit() {
    this.personal = this.formDataService.getPersonal();
    this.children = this.formDataService.getChildren();
    this.beneficiaries = this.formDataService.getBeneficiaries();

     this.title = `${this.personal.Marital_Status} ${this.personal.gender} ${this.personal.IsHaveChildren ?   this.personal.IsHaveMinorChildren ? "With Children Including Minors" : "With Children"  : "Without Children" }`;
    
     this.form = this.fb.group({
         beneficiaries : this.fb.array([], Validators.required)
    });

    
     this.getBeneficiareies()
        
    }


    removeBen(index : number)
    {
     
        this.bens.removeAt(index);
     
        
    } 
    
    addBen() {
    this.bens.push(this.fb.group({
       name: ['', Validators.required],
      contact: [''],
      benefits : this.getBenefits([]),
      type : [null, Validators.required],
      description : ['']
    }));
   
  }

    get bens() { return this.form.get('beneficiaries') as FormArray; }
    
    getBeneficiareies() {
      if (this.beneficiaries.length < 1)
      this.addBen();
    else {
      
          this.beneficiaries.forEach(guard => {          
            this.bens.push(this.fb.group({
              name: [guard.name, Validators.required],
              contact: [guard.contact],
              benefits : this.getBenefits(guard.benefits || []),
              type : [guard.type, Validators.required],
              description : [guard.description]
            }));
          });
        }
        
      
    }

    getBenefits(gifts : Gift[]) : FormArray {
     
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
          type: [null, Validators.required],
          description: ["", Validators.required],
        }));
      }
  
      return arr;
    
    }
 

  save(validate : boolean = true): boolean {
    if (validate && !this.form.valid) {
        return false;
    }


    this.beneficiaries = Helpers.getFormArrayValues(this.bens);
    this.formDataService.setBeneficiaries(this.beneficiaries);
    return true;
}

goToPrevious() {
    if (this.save(false)) {

      if(this.personal.IsHaveChildren || this.children.length > 0)
      {
        this.router.navigate(['/will/children']);
      }
      else
      {
      if(this.personal.IsHaveMinorChildren)
      this.router.navigate(['/will/guardians']);
      else
      {
        // Navigate to the personal page
        if(this.personal.Marital_Status !== MARITAL_STATUS.MARRIED)
        this.router.navigate(['/will/personal']);
        else
        this.router.navigate(['/will/spouse']);
      }
    }
  }
}

goToNext() {
    if (this.save()) {
        // Navigate to the address page
        this.router.navigate(['/will/result']);
    }

  }


  removeGift(childIndex: number, index : number)
  {
    if(this.bens.controls.length >  1 || (this.bens.controls[childIndex].get('isExcluded') as FormControl).value)
      (this.bens.controls[childIndex].get('benefits') as FormArray).removeAt(index);
      else
      {
         this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Include A Gift or Remove This Beneficiary', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-warning alert-with-icon",
             positionClass: 'toast-top-right'
           });
      }
  } 
  
  addGift(childIndex : number) {
    (this.bens.controls[childIndex].get('benefits') as FormArray).push(this.fb.group({
    type: [null, Validators.required],
    description: ["", Validators.required],
  }));
 
}

}