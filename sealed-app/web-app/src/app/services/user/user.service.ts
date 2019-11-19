import { AppUser } from './../../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user$ : Observable<AppUser>;

  constructor(private afs : AngularFirestore) {
  
   }

   save(fbuser : firebase.User)
   {
       // Add a new document in collection "cities"
        
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(`users/${fbuser.uid}`);
    
    const data: AppUser = {
      uid: fbuser.uid,
      email: fbuser.email,
      name: fbuser.displayName,
      photourl : fbuser.photoURL,
            
    }
    return userRef.set(data, {merge : true})
   }
  
   get(uid: string) : Observable<AppUser>
   {
     //console.log("getting user");
    return this.afs.doc<AppUser>(`users/${uid}`).valueChanges();
   }
}
