import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';


import { Observable, BehaviorSubject } from 'rxjs';
import { AppUser, userProfile, fireEmailUser } from '../../../../shared/models/app-user';

import { FirebaseDBProvider } from '../firebase/firebasedb';
import { FirebaseAuthProvider } from '../firebase/firebaseauth';
import { GlobalsProvider } from '../services/globals';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserProvider {
  _user: any;
  user$ : Observable<AppUser>;
  loader: any;
  path: string = "users";
  settings = new  BehaviorSubject<any>({});

  constructor(private fstoredb: FirebaseDBProvider, private fauth: FirebaseAuthProvider, private globals: GlobalsProvider) {
  }
  // /**
  //   constructor(public api: Api){}
  //  * Send a POST request to our login endpoint with the data
  //  * the user entered on the form.
  //  */
  // login(accountInfo: any) {
  //   let seq = this.api.post('login', accountInfo).share();

  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
  //     if (res.status == 'success') {
  //       this._loggedIn(res);
  //     } else {
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });

  //   return seq;
  // }

  // /**
  //  * Send a POST request to our signup endpoint with the data
  //  * the user entered on the form.
  //  */
  // signup(accountInfo: any) {
  //   let seq = this.api.post('signup', accountInfo).share();

  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
  //     if (res.status == 'success') {
  //       this._loggedIn(res);
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });

  //   return seq;
  // }

  // /**
  //  * Log the user out, which forgets the session
  //  */
  // logout() {
  //   this._user = null;
  // }

  // /**
  //  * Process a login/signup response to store user data
  //  */
  // _loggedIn(resp) {
  //   this._user = resp.user;
  // }

  public login(form: fireEmailUser) {
    
    return new Promise((resolve, reject) => {
  
      console.log("loggin in....");
    this.fauth.signIn('email', form)
      .then(() => {
         this.fauth.currentUser().then(user => {
           console.log(user.uid);
        this.globals.setConfig(user.uid);
        resolve(this.checkIfUserIsVerified(user));
    });

    })
    .catch((err: any) => {
      if (err['code'] == "auth/wrong-password") {
        reject('The username or password is wrong.');
      }
      else if (err['code'] == "auth/user-not-found") {
        reject('The user with this email does not exist. Kindly register.');
      }
      reject(err['message']);
     
    });
   
  });
  }

  forgot(form: any): void {
    this.globals.showLoader({
      content: "Sending password reset link to email ..."
    });
    this.fauth.resetPassword(form)
      .then((result) => {
        this.globals.closeLoader();
        this.globals.app.getRootNav().setRoot('CheckEmailPage');
      })
      .catch((error) => {
        this.globals.closeLoader();
        let message = null;
        if (error.code == "auth/user-not-found") {
          message = "Your email was not found in the database. Please check your email and retry again."
        }
        this.globals.ToastAlert(message || JSON.stringify(error.message),{ position: "top", duration: 3000});
      })
  }

  public isVerified = () => this.fauth.currentUser().then(user => user.emailVerified);
     


  private checkIfUserIsVerified(res: firebase.User): boolean {
    if (res != null) {
      if (!this.isVerified) {
        this.globals.NotifyAlert("Error", 'Your account is not verified. Please verify your email.');
        return false;
      } else {
        return true;
      }
    }
  }


     


public getUserInfo(): Promise<userProfile> {
  //  let userProfile = null;
  return new Promise((resolve, reject) => {
     this.fauth.checkAuthState(user => {
      if(user.uid) {
        console.log(user);
        this.fstoredb.getFireStoreData(`${this.path}/${user.uid}`).toPromise()
        .then((userInfo) => {
          console.log(userInfo.data());
            resolve(userInfo.data() as userProfile);
          }).catch(err => reject(err));
        }
      })
    });
   
   // return userProfile;
  }

   updateUserAccountInfo(account: any) {
  
    let profile : userProfile = {
      email: "",
      displayName:  "",
      phoneNumber:  "",
      photoURL:  "",
      providerId:  "",
      uid:  "",
      loginCount :0, 
      badLogins : 0,
      userData : null
     
    };

    console.log("profile before -->",profile);

    const {phone, displayName, photoURL} = account;
        this.fauth.checkAuthState((user: firebase.User) => {
          if(user.uid) {
         //   user.updatePhoneNumber(phone || null);
            user.updateProfile({displayName, photoURL});
          }        
         
          this.globals.objectToObject(profile, account);
          this.globals.objectToObject(profile.userData, account);
          this.fstoredb.updateFireStoreData(`${this.path}/${user.uid}`, profile);
      });

    }

   save(fbuser : firebase.User)
   {
       // Add a new document in collection "cities"
        
    return this.fstoredb.updateFireStoreData(`users/${fbuser.uid}`, 
    {
      uid: fbuser.uid,
      email: fbuser.email,
      name: fbuser.displayName,
      photourl : fbuser.photoURL,
            
    });
   }

}
