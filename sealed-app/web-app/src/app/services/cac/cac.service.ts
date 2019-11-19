import { CacFormData, CacRequest } from './../../models/FormData';


import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class CacService {

  private basePath = 'cac-applications';


  constructor(private afs: AngularFirestore, private auth: AuthService) {

   }

   CreateRequest(request: CacRequest): boolean {

    const response =  this.afs.collection( this.basePath).doc(request.userId)
         .collection('applications').doc(request.requestId).set({...request});

    response.then(a => {
       // send amil

       return true;
    }).catch( err => {
      console.log(err);
      return false;
    });

    return true;

   }



   Update(request: CacRequest) {
     const userRef = this.afs.collection( this.basePath).doc(request.userId).collection('applications').doc(request.requestId);
     return userRef.set(request, {merge : true});
   }

   Delete(request: CacRequest): any {
     return this.afs.collection( this.basePath).doc(request.userId).collection('applications').doc(request.requestId).delete();
   }


   getUserCacRequests(userId?: string): Observable<CacRequest[]> {
     const CacRequestRef =  userId ? this.afs.collection(this.basePath).doc(userId).collection('applications') : this.afs.collection(this.basePath);

     return CacRequestRef.snapshotChanges().pipe(map(actions => {
       return actions.map(a => {
       const data = a.payload.doc.data() as CacRequest;
       data.requestId = a.payload.doc.id;
       console.log(a.payload.doc);
       return data;

     });
   }));
   }


   getAllRequest(filter?: string): Observable<CacRequest[]> {
     let data: Observable<DocumentChangeAction<unknown>[]>;

     data = (filter) ?  this.afs.collection(this.basePath).snapshotChanges() : this.afs.collection(this.basePath).snapshotChanges();


     return data.pipe(
      map(action => {

        const docs: CacRequest[] = [];
          // Get document data
        let rep =   action.forEach(a => {
          const response = this.afs.collection(this.basePath).doc(a.payload.doc.id).collection('applications').snapshotChanges().pipe(
                map(actions => {
                    return actions.map(req => {
                          const data = req.payload.doc.data() as CacRequest;
                          data.userId = req.payload.doc.id;
                          docs.push(data);
                      });
                  }));
             // return response;
        });

        return docs;

      }));

    // const docs : CacRequest[] = [];

    // let documents = await this.afs.collection(this.basePath).get();

    //         documents.forEach(async doc => {
    //           console.log("Parent Document ID: ", doc.id);
    //           let subCollectionDocs = await this.afs.collection(this.basePath).doc(doc.id).collection("applications").get()
    //           subCollectionDocs.forEach(subCollectionDoc => {
    //             subCollectionDoc.forEach(doc => {
    //                const dd = doc.data() as CacRequest;
    //                docs.push(dd);
    //             })
    //         });


  }




   getCacRequest(userId, requestId) {
     return  this.afs.collection( this.basePath).doc(userId).collection('applications').doc(requestId).valueChanges();
   }


// }



}
