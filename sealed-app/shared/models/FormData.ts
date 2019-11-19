import { RegistrationType, CacRequestStatus } from 'src/app/shared/enums';
import { CompanyInformation, CacCompanyInformation } from './CompanyInformation';
import { Personal } from './Personal';
import { Company } from './Company';

export class CacFormData 
{
    requestId : string = '';
     

      personal : Personal = {
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        userType : RegistrationType.Client,
    };

     company :  Company =  {
        companyType  : null,
        headOfficeAddress  : '',
        registeredAddress  : '',
        name1 : "",
        name2 : "",
        name3 : "",
        approvedName : ""
    };

    companyinfo : CompanyInformation = {
       directors : [],
       secetaries : []
    };
    userId: string;
    status: CacRequestStatus;
    
    clear() {
        this.personal = {
            firstName : "",
            lastName : "",
            email : "",
            phone : "",
            userType : RegistrationType.Client,
        };
        
        this.company = {
            companyType  : null,
            headOfficeAddress  : '',
            registeredAddress  : '',
            name1 : "",
            name2 : "",
            name3 : "",
            approvedName  : ""
        };

        this.companyinfo  = {
            directors : [],
            secetaries : []
         };
    }
    

    
}


export interface CacRequest
{
    requestId : string,
    userId : string,
    company: Company,
    companyinfo :  CompanyInformation,
    personal : Personal,
    status : CacRequestStatus
}


