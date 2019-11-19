

import { Children } from './Children';
import { Person } from './Person';
import { WillPersonal } from './WillPersonal';
import { GiftBeneficiary, WillBeneficiary } from './GiftBeneficiary';
import { Spouse } from './Spouse';
import { WillRequestStatus } from '../shared/enums';

export class WillFormData
{
    requestId : string = '';
     

      personal : WillPersonal = {
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        gender : undefined,
        Marital_Status : undefined,
        IsHaveChildren : undefined,
        IsHaveMinorChildren : undefined,
        IsHaveFutureChildren : undefined,
        
    };
    children? :  Children[]= [] ;
    beneficiaries : WillBeneficiary[] = [];
    guardians :  Person[] = [];
    spouse?: Spouse;
    userId: string;
    status: WillRequestStatus;
    
    
    clear() {
        this.personal = {
            firstName : "",
            lastName : "",
            email : "",
            phone : "",
            gender : undefined,
            Marital_Status : undefined,
            IsHaveChildren : false,
            IsHaveMinorChildren : false,
            IsHaveFutureChildren : undefined,
            
        };
        
        this.beneficiaries = [];
      //  this.guardians = [];
       // this.children = [];
      //  this.spouse = null;
    }
    

    
}


export interface WillRequest{
 //   children? :  Children[] ;
    beneficiaries : WillBeneficiary[];
  //  guardians :  Person[];
  //  spouse?: Spouse;
    personal : WillPersonal;
    userId: string;
    status: WillRequestStatus;
    requestId : string;
}


