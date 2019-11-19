import { UserProvider } from './../../providers/user/user';
import { MainPage, CheckEmailPage } from './../index';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsProvider } from '../../providers/services/globals';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.required)
  });
  successpage = MainPage;
  validatepage = CheckEmailPage;

  constructor(private navCtrl: NavController, private userService: UserProvider,private globals : GlobalsProvider , private viewCtrl: ViewController,
    private translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }




  ionViewWillEnter()
  {
    console.log("loggedin ==> ", this.globals.config.login);
    if(this.globals.config.login && this.userService.isVerified)
      this.navCtrl.setRoot("DashboardPage");
  }

  ionViewDidLoad() {
  
  }

  async login(form :any)
  {   
    this.globals.showLoader({ content: "Authenticating....", });
     this.userService.login(form).then( (res: string) => {
       console.log("RES", res);
       if(res)
       this.navCtrl.setRoot(this.successpage);
       else
       this.navCtrl.push(this.validatepage);
      this.globals.closeLoader();
    }).catch(err => {
      this.globals.closeLoader();
          this.globals.NotifyAlert("Auth Error", err);
    });
  
  
  }

  goToRegister()
  {
    this.navCtrl.push('RegisterPage');
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }

 
}
