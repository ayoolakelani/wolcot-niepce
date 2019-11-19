import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 

  firstName: string;
  lastName: string;
  emailaddress: string;
  Password: string;
  RePassword: string;
  
  constructor(private userService :UserService, private auth: AuthService, private router : Router, private route : ActivatedRoute){
    
    this.auth.LoggedInUser.subscribe( user => {
      if(user) 
       {
        var url = localStorage.getItem('returnUrl');
        router.navigateByUrl(url);
      }
     });
 }


 ngOnInit() {
    
  }

    SignUp()
    {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
      localStorage.setItem("returnUrl", returnUrl);
       this.auth.EmailSignUp(this.emailaddress, this.Password, this.firstName, this.lastName).then(a => this.router.navigateByUrl("/"));
    }

  
    googlelogin() {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
      localStorage.setItem("returnUrl", returnUrl);
      this.auth.googleLogin();
     }

  checkpasswords()
  {
    return this.Password && this.RePassword && this.Password != "" && this.RePassword.trim() === this.Password.trim();
  }

}
