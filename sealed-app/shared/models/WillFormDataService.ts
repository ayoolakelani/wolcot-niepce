import { WillService } from './../services/will/will.service';
import { AuthService } from './../services/auth/auth.service';
import { WillRequest } from 'src/app/models/WillFormData';
import { GiftType, MARITAL_STATUS } from 'src/app/shared/enums';
import { WillFormServiceModule } from './../forms/will-multi-step-form/WillFormServiceModule';
import { AdminLayoutModule } from 'src/app/layouts/admin-layout/admin-layout.module';
import { WillWorkflowService } from './../forms/will-multi-step-form/workflow/will-workflow.service';
import { WILL_FORM_STEPS } from './../forms/cac-multi-step-form/workflow/workflow.model';
import { WillFormData } from './WillFormData';
import { WillPersonal } from "./WillPersonal";
import { Person } from "./Person";
import { Children } from "./Children";
import { GiftBeneficiary, WillBeneficiary } from "./GiftBeneficiary";
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { WillMultiStepFormModule } from '../forms/will-multi-step-form/will-multi-step-form.module';
import { FormBuilder } from '@angular/forms';
import { Spouse } from './Spouse';

@Injectable({
    providedIn: WillFormServiceModule
  })
export class WillFormDataService {
 
 
 




    private formData: WillFormData = new WillFormData();
    private isPersonalFormValid: boolean = false;
    private isBeneficiaryValid: boolean = false;
    private isVideoUploaded: boolean = false;
    private isGuardianValid: boolean = false;
    private isChildrenValid: boolean = false;
    private isSpouseFormValid: boolean = false;
    
    constructor(private workflowService: WillWorkflowService,private willService: WillService, private fb : FormBuilder, private auth : AuthService) {
    
    }
    getFromData(): WillFormData {
      return this.formData;
  }
  setFromData(data : WillRequest) {
     
          this.formData.personal = data.personal || new WillPersonal();
          this.formData.beneficiaries = data.beneficiaries || [];
          this.formData.requestId = data.requestId;
          this.formData.userId = data.userId;
          this.formData.status = data.status;
   }

    getPersonal(): WillPersonal {
      console.log(this.formData);
        return this.formData.personal;
    }
    getRequestId(): string {
        if (!this.formData.requestId)
            this.formData.requestId = Guid.raw();
        return this.formData.requestId;
    }
    
    setPersonal(data: WillPersonal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.personal = {...data};
       
        // Validate Personal Step in Workflow
        //  let skips = [];
        //   if (data.Marital_Status !== MARITAL_STATUS.MARRIED)
        //   {
        //       this.isSpouseFormValid = true;
        //       skips.push(WILL_FORM_STEPS.spouse);
        //   }
        //       this.ValidateStepsWithSkips(WILL_FORM_STEPS.personal, skips);

        this.workflowService.validateStep(WILL_FORM_STEPS.personal);
    }

    setSpouse(spouse: Spouse) {
      this.isSpouseFormValid = true;
      this.formData.spouse = spouse;
         let skips = [];
         this.ValidateStepsWithSkips(WILL_FORM_STEPS.spouse, skips);
    }

    getSpouse() {
         return  this.formData.spouse;
     };

 


    ValidateStepsWithSkips( validateStep : string, skips : string[])
        {
          
          let data = this.formData.personal;
            
          if(data.IsHaveChildren)
          {
            if(!this.formData.personal.IsHaveMinorChildren)
            {
              this.isGuardianValid = true;
              skips.push(WILL_FORM_STEPS.guardians);
            }
          }
          else
          {

            this.isGuardianValid = true;
            this.isChildrenValid = true;
           skips.push(WILL_FORM_STEPS.guardians,WILL_FORM_STEPS.children);   
          }
            this.workflowService.validateStep(validateStep, skips);
    }

    getBeneficiaries(): WillBeneficiary[] {
        // Return the Address data
        return this.formData.beneficiaries;
    }
   
    setBeneficiaries(data: WillBeneficiary[]) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isBeneficiaryValid = true;
        this.formData.beneficiaries = data;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(WILL_FORM_STEPS.beneficiaries);
    }

    getChildren() {
        // Return the Address data
        return this.formData.children;
    }

    setChildren(data: Children[]) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isChildrenValid = true;
        this.formData.children = data;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(WILL_FORM_STEPS.children);
    }

    getGuardians() {
        // Return the Address data
        console.log(this.formData);
        return this.formData.guardians;
    }
    setGuardians(data: Person[]) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isGuardianValid = true;
        this.formData.guardians = data;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(WILL_FORM_STEPS.guardians);
    }

    getFormData(): WillFormData {
        // Return the entire Form Data
        return this.formData;
    }
    resetFormData(): WillFormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isBeneficiaryValid = this.isVideoUploaded = false;
        return this.formData;
    }
    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&// this.isChildrenValid && this.isGuardianValid &&
               this.isBeneficiaryValid  // this.isSpouseFormValid 
    }
    

    
  createGuardian() {
    return this.fb.group({
   
      name : '',
      contact: '',
    
    });
  }

  createBeneficary() {
    return this.fb.group({
      name: '',
      description: '',
      price: ''
    });
  }
  


  createGift(type : GiftType) {
    return this.fb.group({
      name: '',
      description: '',
      price: ''
    });
  }

      
  createWillChildren(): import("@angular/forms").AbstractControl {
    throw new Error("Method not implemented.");
  }





}
