import { FirebaseAuthProvider } from './../../providers/firebase/firebaseauth';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { MainPage, CheckEmailPage } from '../';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsProvider } from '../../providers/services/globals';
import { fireEmailUser } from '../../../../shared/models/app-user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rpassword: new FormControl('', Validators.required),
  });
  passwordMatch: boolean;
  errorMessage: '';

  constructor(
    private navCtrl: NavController,
    private fauth: FirebaseAuthProvider,
    private globals: GlobalsProvider,
    private viewCtrl: ViewController
  ) {
  }

  register = async (form: fireEmailUser) => {
    try {
      if (this.checkPassword && this.isvalidPassword()) {
        await this.fauth.signUp(form);
        await this.fauth.sendEmailVerification();
        this.globals.ToastAlert("Registration Successful, Please Verify Your Email")
        this.navCtrl.push(CheckEmailPage);
      }
    }
    catch (err) {
      this.globals.NotifyAlert("Error", err.message);
    }
  }

  checkPassword() {
    this.passwordMatch = (this.registerForm.controls.password.value == this.registerForm.controls.rpassword.value) ? true : false;
  }

  isvalidPassword() {
    const regex = /^[a-z0-9]{5,12}$/;
    const match = this.registerForm.controls.password.value.match(regex);
    if (match) {
      return true;
    }
    throw new Error("The Password Must be between 5 and 12 Alphanumeric characters");

  }

  dismiss = () => {
    this.viewCtrl.dismiss();
  }
}
