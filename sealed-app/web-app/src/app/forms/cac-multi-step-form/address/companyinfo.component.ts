import { CompanyType, IDType } from './../../../shared/enums';
import { FileUpload } from "../../../models/FileUpload";
import { UserFileInformation } from "../../../models/UserInformation";
import { CompanyRequirmentSetting } from "../../../models/CompanyRequirmentSetting";
import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { CompanyInformation } from "../../../models/CompanyInformation";
import { CacFormDataService }     from '../../../models/formData.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UploadFileService } from 'src/app/services/fileupload/upload-file.service';

@Component ({
    selector:     'mt-wizard-address'
    ,templateUrl: './companyinfo.component.html'
})

export class CompanyInfoComponent implements OnInit {
   
    title = 'Business Owner Information';
    public companyinfo: CompanyInformation;
    form: any;
    companysettings : CompanyRequirmentSetting =  null;
    public categories  =  Object.values(IDType);
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;
    currentFileUpload: FileUpload;
    percentage: number = 0;
    fileValid: Array<boolean> = [false];

    constructor(private toastr: ToastrService, private router: Router, 
                private uploadService: UploadFileService,
                private formDataService: CacFormDataService, private afStorage: AngularFireStorage) {


     }



    ngOnInit() {
       
       // this.address = this.formDataService.getAddress();
        console.log('Address feature loaded!');

        this.companyinfo = this.formDataService.getCompanyInformation();
        
        this.getSettings(this.formDataService.getCompany().companyType);
        for(let i = this.companyinfo.directors.length; i<  this.companysettings.directorsCount; i++)
        {
           this.addDirector(Date.now()); 
        }

        if(this.companysettings.secretariesCount > 0)
        {
           if(!this.companyinfo.secetaries) 
               this.companyinfo.secetaries = [];
               for(let i = this.companyinfo.secetaries.length; i<  this.companysettings.secretariesCount; i++)
               {
                  this.addSecretary(Date.now()); 
               }
        }
                
      
    }
    
    isFileValid(): boolean {
       let  isDirectorsValid =  this.companyinfo.directors.map(a =>  {return a.fileUploaded == false }).indexOf(false) == -1
        let isSecVaild = true;
        if(this.companyinfo.secetaries && this.companyinfo.secetaries.length > 0)
        isSecVaild = this.companyinfo.secetaries.map(a =>  {return a.fileUploaded == false }).indexOf(false) == -1

        return isDirectorsValid && isSecVaild;
      }
    

    //Delete Previous File if exist before upoading
    upload(event,userId:number, usertype : number = 1) {
                
        let userinfo = usertype == 1 ?  this.companyinfo.directors.find(a => a.id == userId) : this.companyinfo.secetaries.find(a => a.id == userId);
        
        if(userinfo.fileUploaded)
        {
            this.uploadService.deleteFileUpload(userinfo.files);
        }
       
        const file = event.target.files[0];
        
        //this.selectedFiles = undefined;
        this.currentFileUpload = {
            file : file,
            requestId:  '',
            key: '' ,
            name: '',
            url: '',
        };
        this.currentFileUpload.requestId =  this.formDataService.getRequestId();
        this.uploadProgress = this.uploadService.pushFileToStorage(this.currentFileUpload);
       
        userinfo.fileUploaded = true;
         this.uploadProgress.subscribe(
          percentage => {
            
              userinfo.files =  this.currentFileUpload;
              userinfo.percentage = Math.round(percentage);
           
            // this.percentage = Math.round(percentage);
          },
          
          error => {
            console.log(error);
          }
        );
      }

    upload2(event, userId:number, usertype : number = 0) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
       // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
        this.uploadProgress = this.task.percentageChanges();
        this.task.snapshotChanges().pipe(
            finalize(() => {
              if(usertype == 0)
              {
              this.downloadURL = this.ref.getDownloadURL()
              this.downloadURL.subscribe(url =>  this.companyinfo.directors.find(a => a.id == userId).files.url = url);
              this.companyinfo.directors.find(a => a.id == userId).files.name = event.target.files[0].name;
              }
            })
          )
          .subscribe()
      }

    addSecretary(id? : number)
    {
        if(this.companyinfo.secetaries)
        
        this.companyinfo.secetaries.push({
            id : id,
            IdCardNo : "",
            IdType : undefined,
            email : "",
            firstName : "",
            lastName : "",
            phone : "",
            files : {
                requestId : '',
                file : null,
                key :  '',
                 name: '',
                 url : ''
            },
            percentage : 0,
            fileUploaded :  false
                

        });
    
    }
    
    addDirector(id? : number) {
        if(!id)
        id = this.companyinfo.directors.length;
        this.companyinfo.directors.push({
            id : id,
            IdCardNo : "",
            IdType : undefined,
            email : "",
            firstName : "",
            lastName : "",
            phone : "",
            files : {
                requestId : '',
                file : null,
                key :  '',
                 name: '',
                 url : ''
            },
            percentage : 0,
            fileUploaded : false
        })
    }

    removeSecretary(index : number){
        if(this.companyinfo.secetaries.length > this.companysettings.secretariesCount)
        {
            let userinfo =  this.companyinfo.secetaries.find(a => a.id == index)
            if(userinfo && userinfo.fileUploaded)
            this.uploadService.deleteFileUpload(userinfo.files);
            this.companyinfo.secetaries.splice(index);
        }
        else
         {
            this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Have at least ' +this.companysettings.secretariesCount + ' secretary information </b>', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: 'toast-top-right'
              });
         }
    }


    removeDirector(index : number){
        if(this.companyinfo.directors.length > this.companysettings.directorsCount)
        {
            let userinfo =  this.companyinfo.directors.find(a => a.id == index)
            if(userinfo && userinfo.fileUploaded)
            this.uploadService.deleteFileUpload(userinfo.files);
            this.companyinfo.directors.splice(index);
     
        }
        else
         {
            this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> You Must Have at least ' +this.companysettings.directorsCount + ' director information </b>', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: 'toast-top-right'
              });
         }
    }

    
    
    save(form: any, validate : boolean = true): boolean {
        if (validate && !form.valid) {
            return false;
        }
         this.formDataService.setCompanyInformation(this.companyinfo);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form, false)) {
            // Navigate to the work page
            this.router.navigate(['/cac/company']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the result page
            this.router.navigate(['/cac/result']);
        }
    }


    getSettings(type :  CompanyType)
    {
        
          switch(type){
            case CompanyType.BUSINESS_NAME:{
                this.companysettings = CompanyRequirmentSetting.BUSINESS_NAME;
                break;
            }
                
            case CompanyType.LIMITED_BY_GURANTEE: {
                this.companysettings = CompanyRequirmentSetting.LIMITED_BY_GURANTEE;
                break;
            }
              
           case CompanyType.LIMITED_BY_SHARES: {
                  this.companysettings = CompanyRequirmentSetting.LIMITED_BY_SHARES;
                  break;
           }
         
            case CompanyType.UNLIMITED:{
              
                this.companysettings = CompanyRequirmentSetting.UNLIMITED; 
                 break;
            }
        }

        
    }
}