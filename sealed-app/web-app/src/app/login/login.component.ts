import { AuthService } from './../services/auth/auth.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username : string;
  password : string;
  constructor(private userService :UserService, private auth: AuthService, private router : Router, private route : ActivatedRoute){
    
    this.auth.LoggedInUser.subscribe( user => {
      if(user) 
       {
        var url = localStorage.getItem('returnUrl');
        router.navigateByUrl(url);
      }
     });
 }

  
 googlelogin() {
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
  localStorage.setItem("returnUrl", returnUrl);
  this.auth.googleLogin();
 }


 login() {
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
  localStorage.setItem("returnUrl", returnUrl);
  this.auth.EmailLogin(this.username, this.password).then(a => this.router.navigateByUrl(returnUrl));;
 }





}
 