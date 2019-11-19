import { WillRequest } from './../models/WillFormData';
import { map } from 'rxjs/operators';
import { WillFormDataService } from 'src/app/models/WillFormDataService';
import { WillService } from './../services/will/will.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-will',
  templateUrl: './will.component.html',
  styleUrls: ['./will.component.scss']
})
export class WillComponent implements OnInit {
  userId: string;
  requests$: any;
  isExist : boolean =  false;
  data : WillRequest;

  constructor(private willService : WillService, private auth : AuthService, private formDataService : WillFormDataService) {
       
   }

  async ngOnInit() {
    await this.auth.AppUser$.subscribe(a => {this.userId == a.uid 
      this.isExist = true;
      this.requests$ = this.willService.getUserWillRequestsBenefits(a.uid);
     
    });

   await  this.willService.getUserWillRequests(this.userId).subscribe(data => {
      this.data = data;
      console.log(data);         
      this.formDataService.setFromData(data);
     
   });
     
   }

}

