
export class FileInformation {
    requestId: string = '';
    key: string;
    name: string;
    url: string;
  
}

export class FileUpload extends FileInformation{
  
    file?: File;
   
    // constructor(file: File) {
    //     super();
    //     this.file = file;
    // }
}





