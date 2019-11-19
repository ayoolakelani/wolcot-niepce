import { CAC_FORM_STEPS } from './../../web-app/src/app/forms/cac-multi-step-form/workflow/workflow.model';
import { CacWorkflowService } from './../../web-app/src/app/forms/cac-multi-step-form/workflow/workflow.service';





import { Personal } from './Personal';

import { Company } from './Company';
import { CacFormData } from './FormData';
import { CompanyInformation } from './CompanyInformation';


export class CacFormDataService {
    
    private formData: CacFormData = new CacFormData();
    private isPersonalFormValid: boolean = false;
    private isCompanyFormValid: boolean = false;
    private isCompanyInfoFormValid: boolean = false;

    constructor(private workflowService: CacWorkflowService) { 
    }

    getPersonal(): Personal {
 
        return this.formData.personal;
    }

    // getRequestId(): string {
    //     if(!this.formData.requestId)
    //      this.formData.requestId = Guid.raw();

    //      return this.formData.requestId ;
    // }


    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.personal = data;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(CAC_FORM_STEPS.personal);
    }

    getCompany() : Company {
        // Return the work type
        return this.formData.company;
    }
    
    setCompany(data: Company) {
        // Update the work type only when the Work Form had been validated successfully
        this.isCompanyFormValid = true;
        this.formData.company = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(CAC_FORM_STEPS.company);
    }

    getCompanyInformation() : CompanyInformation {
        // Return the Address data
        return this.formData.companyinfo;
    }

    setCompanyInformation(data: CompanyInformation) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isCompanyInfoFormValid = true;
        this.formData.companyinfo = data;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(CAC_FORM_STEPS.companyinfo);
    }

    getFormData(): CacFormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): CacFormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isCompanyFormValid = this.isCompanyInfoFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
               this.isCompanyFormValid  && 
               this.isCompanyInfoFormValid
    }
}



