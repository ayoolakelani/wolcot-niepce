import { BeneficiaryType, Relationship } from './../shared/enums';
import { Person } from "./Person";
import { Gift } from "./Gift";
export class GiftBeneficiary extends Person {
    benefits: Gift[];
    description : string;
  
}


export class WillBeneficiary extends GiftBeneficiary{
    type :  Relationship = null;
}
