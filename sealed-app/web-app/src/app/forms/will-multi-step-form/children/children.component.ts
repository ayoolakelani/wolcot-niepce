import { Children } from "./../../../models/Children";
import { Component, OnInit } from '@angular/core';
import { WillPersonal } from "src/app/models/WillPersonal";
import { Person } from "src/app/models/Person";
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { Helpers } from 'src/app/shared/Helpers';
import { MARITAL_STATUS, GiftType } from 'src/app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { Gift } from 'src/app/models/Gift';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  title = '';
  children: Children[] = [];
  personal: WillPersonal;
  form: FormGroup;
  maxDate: { year: number; month: number; day: number; };
  public giftTypes = Object.keys(GiftType);

  constructor(private toastr: ToastrService,private router: Router, private formDataService: WillFormDataService, private fb :  FormBuilder) {
    const current = new Date();
       this.maxDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
         day: current.getDate()
  };
  }


  ngOnInit() {
    this.personal = this.formDataService.getPersonal();
    this.children = this.formDataService.getChildren();

     this.title = `${this.personal.Marital_Status} ${this.personal.gender} ${this.personal.IsHaveChildren ?   this.personal.IsHaveMinorChildren ? "With Children Including Minors" : "With Children"  : "" }`;
    
     this.form = this.fb.group({
         children : this.fb.array([], [Validators.required, Validators.min(1)])
    });

    
     this.getChildren()
        
    }


    removeChild(index : number)
    {
      if(this.childs.controls.length > 1)
        this.childs.removeAt(index);
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
    
    addChild() {
    this.childs.push(this.fb.group({
       name: ['', Validators.required],
       dateOfBirth : [null, [Validators.required]],
      contact: [''],
      isExcluded : [false],
      benefits : this.getBenefits([]),
      description : ['']
    }));
   
  }

   setGiftValidation(childIndex : number) {

    if(this.childs.controls[childIndex].get('isExcluded').value)
    {
     
      (this.childs.controls[childIndex].get('benefits') as FormArray).controls.forEach(c => {
        c.get('type').clearValidators();
        c.get('type').updateValueAndValidity();
        c.get('description').clearValidators();
        c.get('description').updateValueAndValidity();
        c.clearValidators();
        c.updateValueAndValidity();
        console.log(c);
      });
      this.childs.controls[childIndex].get('benefits').clearValidators();
      this.childs.controls[childIndex].get('benefits').updateValueAndValidity();
    }

   
 }

  removeGift(childIndex: number, index : number)
  {
    if(this.childs.controls.length >  1 || (this.childs.controls[childIndex].get('isExcluded') as FormControl).value)
      (this.childs.controls[childIndex].get('benefits') as FormArray).removeAt(index);
      else
      {
         this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Include A Gift or Exclude This Child', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-warning alert-with-icon",
             positionClass: 'toast-top-right'
           });
      }
  } 
  
  addGift(childIndex : number) {
    (this.childs.controls[childIndex].get('benefits') as FormArray).push(this.fb.group({
    type: [null, Validators.required],
    description: ["", Validators.required],
  }));
 
}

    get childs() { return this.form.get('children') as FormArray; }
    
    getChildren() {
     console.log(this.childs);
        if (this.children.length < 1)
          this.addChild();
        else {
          this.children.forEach(guard => {
           
            this.childs.push(this.fb.group({
              name: [guard.name, Validators.required],
              dateOfBirth : [guard.dateOfBirth || null, [Validators.required]],
              contact: [guard.contact],
              isExcluded : [guard.isExcluded],
              benefits : this.getBenefits(guard.benefits || []),
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


    this.children = Helpers.getFormArrayValues(this.childs);
    this.formDataService.setChildren(this.children);
    return true;
}

goToPrevious() {
    if (this.save(false)) {

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

goToNext() {
    if (this.save()) {
        // Navigate to the address page
        this.router.navigate(['/will/beneficiaries']);
    }

}

}
