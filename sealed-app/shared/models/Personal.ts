import { RegistrationType } from 'src/app/shared/enums';
export class Personal {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    userType?: RegistrationType = RegistrationType.Client;
}
