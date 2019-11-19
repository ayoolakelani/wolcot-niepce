import { WillMultiStepFormModule } from '../../forms/will-multi-step-form/will-multi-step-form.module';
import { Injectable } from '@angular/core';
import { WillFormServiceModule } from '../../forms/will-multi-step-form/WillFormServiceModule';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { WillRequest } from 'src/app/models/WillFormData';
import { WillBeneficiary } from 'src/app/models/GiftBeneficiary';

@Injectable({
  providedIn: WillFormServiceModule
})
export class WillService {
  private basePath = 'will-applications';
   

  constructor(private afs: AngularFirestore, private auth: AuthService) {
          
   }

   CreateRequest(request : WillRequest) : boolean
   {
    
        const userRef = this.afs.collection( this.basePath).doc(request.userId).collection("applications").doc(request.requestId);
        var response =  userRef.set(request, {merge : true})
    response.then(a => {
       // send amil

       return true;
    }).catch( err => {
      console.log(err)
      return false;
    });

    return true;
  
   }


  
   Update(request : WillRequest)
   {
     const userRef = this.afs.collection( this.basePath).doc(request.userId).collection("applications").doc(request.requestId);
     return userRef.set(request, {merge : true})
   }
 
   Delete(request: WillRequest): any {
     return this.afs.collection( this.basePath).doc(request.userId).collection("applications").doc(request.requestId).delete();
   }
 
 
   getUserWillRequests(userId?: string) : Observable<WillRequest>
   {
     var WillRequestRef =  userId ?this.afs.collection(this.basePath).doc(userId).collection("applications") : this.afs.collection(this.basePath);
     
     return WillRequestRef.snapshotChanges().pipe(mergeMap(actions => {
       return actions.map(a => {
       const data = a.payload.doc.data() as WillRequest;
       data.requestId = a.payload.doc.id;
       console.log(a.payload.doc);
       return data;
       
     });
   }));
   }

   getUserWillRequestsBenefits(userId?: string) : Observable<WillBeneficiary[]>
   {
     var WillRequestRef =  userId ?this.afs.collection(this.basePath).doc(userId).collection("applications") : this.afs.collection(this.basePath);
     
     return WillRequestRef.snapshotChanges().pipe(mergeMap(actions => 
      {
      
       return actions.map(a => {
       const data = a.payload.doc.data() as WillRequest;
       data.requestId = a.payload.doc.id;
       
       return data.beneficiaries;
       
     });
   }));
   }


   getAllRequest(filter? : string) : Observable<WillRequest[]>
   {
     let data :  Observable<DocumentChangeAction<unknown>[]>;
    
       data = (filter) ?  this.afs.collection(this.basePath).snapshotChanges() : this.afs.collection(this.basePath).snapshotChanges(); 

     
    return data.pipe(   
      map(action => {

        const docs : WillRequest[] = [];
          //Get document data 
         var rep =   action.forEach(a => { 
          var response = this.afs.collection(this.basePath).doc(a.payload.doc.id).collection("applications").snapshotChanges().pipe(
                map(actions => 
                  {
                    return actions.map(req =>
                      {
                          const data = req.payload.doc.data() as WillRequest;
                          data.userId = req.payload.doc.id
                          docs.push(data);
                      });
                  }));          
             // return response;
        });
         
        return docs;
       
      }));

    // const docs : WillRequest[] = [];
     
    // let documents = await this.afs.collection(this.basePath).get();

    //         documents.forEach(async doc => {
    //           console.log("Parent Document ID: ", doc.id);
    //           let subCollectionDocs = await this.afs.collection(this.basePath).doc(doc.id).collection("applications").get()
    //           subCollectionDocs.forEach(subCollectionDoc => {
    //             subCollectionDoc.forEach(doc => {
    //                const dd = doc.data() as WillRequest;
    //                docs.push(dd);
    //             })
    //         });
    
    
  }
 
 

  
   getWillRequest(userId, requestId)
   {
     return  this.afs.collection( this.basePath).doc(userId).collection("applications").doc(requestId).valueChanges();
   }
   
  }