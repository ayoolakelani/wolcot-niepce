import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/user.service';
import {AppUser} from './../../models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
      //// Get auth data
      this.user$ = this.afAuth.authState;
  }
  googleLogin() {

    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {

    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.userService.save(credential.user);
      }).catch( err =>  {
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>' + err.message , '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-error alert-with-icon',
          positionClass: 'toast-top-right'
        });
      });
  }

  EmailSignUp(email, password, lastname, firstname) {
     return firebase.auth().createUserWithEmailAndPassword(email, password).then((credential) => {
          //  credential.user.displayName = lastname + " " + firstname

        this.userService.save(credential.user);

      }
    ).catch( err =>  {
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>' + err.message , '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-error alert-with-icon',
        positionClass: 'toast-top-right'
      });
    });
  }


  EmailLogin(email, password) {return firebase.auth().signInWithEmailAndPassword(email, password).then((credential) => {
    //  credential.user.displayName = lastname + " " + firstname
           this.userService.save(credential.user);
      }
    ).catch( err =>  {
    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>' + err.message , '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-error alert-with-icon',
      positionClass: 'toast-top-right'
    });
    });
}

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  get LoggedInUser(): Observable<firebase.User> {return this.user$; }

  get AppUser$(): Observable<AppUser> {
    return this.user$
    .pipe(switchMap(fbu => {
        if (fbu) {

               return this.userService.get(fbu.uid);

        }
        return of(null);
      }
    ));
  }
}
