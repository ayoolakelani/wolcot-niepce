import { AuthService } from './../services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { CacService } from './../services/cac/cac.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CacRequest } from '../models/FormData';
import { CacRequestStatus } from '../shared/enums';

@Component({
  selector: 'app-cac',
  templateUrl: './cac.component.html',
  styleUrls: ['./cac.component.scss']
})
export class CacComponent implements OnInit {

  userId : string;
  requests$ : Observable<CacRequest[]>;
  public Statuses  =  Object.values(CacRequestStatus);

  constructor(private cacService : CacService, private auth : AuthService) { }

  ngOnInit() {

    this.auth.AppUser$.subscribe(a => {this.userId == a.uid 
      this.requests$ = this.cacService.getUserCacRequests(a.uid);
    });
    

    
  }

}
