import { AuthService } from './services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  


  constructor(private auth: AuthService, private router : Router) { 

  }

    
  canActivate(route, state: RouterStateSnapshot) {
  
    return this.auth.LoggedInUser.pipe(map(user => {
     if(user) 
     {
  
    //  this.router.navigate([state.url || "/"]);
    //  console.log("URL", state.url);
     return true;
     }
     this.router.navigate(["/login"], {queryParams : {returnUrl :  state.url}});
     return false
   }));
  }

}
