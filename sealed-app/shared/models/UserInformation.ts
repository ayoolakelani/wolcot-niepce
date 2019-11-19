
import { Personal } from './Personal';
import { IDType } from '../shared/enums';
import { FileUpload, FileInformation } from './FileUpload';

export class UserInformation extends Personal {
    id: number;
    IdType: IDType;
    IdCardNo: string = '';
}



export class UserFileInformation extends UserInformation {
 
    files: FileUpload = {
        file: null,
        key: '',
        name: '',
        url: '',
        requestId: '',
    };
    percentage: number = 0;
    fileUploaded: boolean = false;
}


export class CacUserInformation extends UserFileInformation {
        files :  FileInformation = {
            key: '',
            name: '',
            url: '',
            requestId: '',
        };
     
}







