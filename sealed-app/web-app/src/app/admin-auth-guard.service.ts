
import { AuthService } from './services/auth/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './services/user/user.service';

@Injectable({
  providedIn: 'root'  
})
export class AdminAuthGuard  implements CanActivate {
  
  constructor(private auth: AuthService, private userService :  UserService)
  {

  }
  
  canActivate() :  Observable<boolean> {
    return this.auth.AppUser$  
    .pipe(map( u => u.isAdmin));
  }
  
}
