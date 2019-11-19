import { UserFileInformation, CacUserInformation } from "./UserInformation";

export class CompanyInformation {
    directors: UserFileInformation[];
    secetaries?: UserFileInformation[];
}


export class CacCompanyInformation {
    directors: CacUserInformation[];
    secetaries?: CacUserInformation[];

 
}