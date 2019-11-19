import { FirebaseDBProvider } from './firebasedb';
import { UserProvider} from './../user/user';

import { fireEmailUser } from './../../../../shared/models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import { Facebook } from '@ionic-native/facebook';
import { GlobalsProvider } from '../services/globals';
import { Observable } from 'rxjs';

@Injectable()

export class FirebaseAuthProvider {
  currentUserId() {
    throw new Error("Method not implemented.");
  }

  loading: any;
  user$: Observable<firebase.User>;
  
 //firebase: any = firebase;
  constructor(
    private globals: GlobalsProvider,private afAuth: AngularFireAuth, private fstoredb: FirebaseDBProvider) {
    this.user$ = this.afAuth.authState;
  }

  public checkAuthState = (callback: any) => {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        callback(user);
      },
      (error) => {
        callback(error);
      }
    );
  }



  currentUser():Promise<firebase.User> {
    return new Promise((resolve, reject) => {
       const unsubscribe = this.afAuth.auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }

   sendEmailVerification() {
     this.currentUser().then(user => user.sendEmailVerification());
    
  }

  

  // signOut = () => {
  //   if (this.globals.platform.is('cordova')) {
  //     // this.fb.logout();
  //   }
  //   return this.afAuth.auth.signOut();
  // }

  public async signIn(type: string = 'email', form: fireEmailUser) {


    switch (type) {
      case "email":
        {
          try 
          {
            return await this.afAuth.auth.signInWithEmailAndPassword(form.email, form.password);
            
          }
          catch (err) 
          {
            console.error(err);
            throw new Error(err.message);
          }
        }
      case "facebook": 
      {
       
          try {
            return await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
 
          }
           catch(ex) 
          {
           throw new Error(ex);
          }
        
      }
      default:
      {

      }
    }
  }

  public async signUp(form: fireEmailUser) {
    return this.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password).then((credential) => {
      //  credential.user.displayName = lastname + " " + firstname
      this.save(credential.user);   
  }).catch( err =>  {
   this.globals.ToastAlert(err.message,  {
    duration: 5000,
    position: 'top'
  });
})
  }

  public updateProfile(form) {
    return this.afAuth.auth.currentUser.updateProfile(form);
  }

  public async resetPassword(form) {
    return await this.afAuth.auth.sendPasswordResetEmail(form.email);
  }

    googleLogin() {
  
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);
    }
 
    private oAuthLogin(provider) {
  
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.save(credential.user);
        }).catch( err =>  {
          this.globals.ToastAlert(err.message,  {
            duration: 5000,
            position: 'top'
          });
        })
    }
  
    EmailSignUp(email, password)
    {
       return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
            //  credential.user.displayName = lastname + " " + firstname
          
          this.save(credential.user);
         
        }
      ).catch( err =>  {
         this.globals.ToastAlert(err.message,  {
          duration: 5000,
          position: 'top'
        });
      })
    }
  
  
    EmailLogin(email, password)
    {return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {
      //  credential.user.displayName = lastname + " " + firstname
             this.save(credential.user);
        }
      ).catch( err =>  {
        this.globals.ToastAlert(err.message,  {
          duration: 5000,
          position: 'top'
        });
      })
  }
  
    signOut() {
      return this.afAuth.auth.signOut().then(() => {
         return true;
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
