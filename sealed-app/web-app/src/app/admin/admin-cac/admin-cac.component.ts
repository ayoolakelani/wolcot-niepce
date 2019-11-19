import { CacRequest } from './../../models/FormData';
import { CacService } from './../../services/cac/cac.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'admin-cac',
  templateUrl: './admin-cac.component.html',
  styleUrls: ['./admin-cac.component.scss']
})
export class AdminCacComponent implements OnInit {

 applications$ : Observable<CacRequest[]>;
 data: CacRequest[] = [];
 subscription: Subscription;
  
  constructor(private cacService : CacService) { 
    this.applications$ =  this.cacService.getAllRequest();
  }

 
 
  ngOnInit() {
 
    this.subscription = this.applications$.subscribe(data => {
           this.data = data;
     });
   
   }
 
   ngOnDestroy() {
     this.subscription.unsubscribe();
     
   }
 
   applyFilter(filterValue: string) {
     this.applications$ = this.cacService.getAllRequest(filterValue.trim().toLowerCase());
  
   } 
 }


