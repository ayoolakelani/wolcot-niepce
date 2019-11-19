import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

@Injectable()

export class FirebaseDBProvider
{
  private url = '';
  constructor(private firestore: AngularFirestore) { 
  }

  getRealTimeData = (routes: string, callback: Function) =>
  {
    firebase.database()
        .ref().child(routes)
        .on('value', 
          (data) => {
            let obj = this.objectToArray(data.val());
            callback(obj)
          }
        )
  }
  
  getFireData = async (routes = null) => 
  {
    return await new Promise((resolve, reject) => {
      try{
        firebase.database()
          .ref(routes)
          .on('value', (res) => {
            resolve(res.val())
          })
      }
      catch(ex){
        reject(ex);
      }
    })
  }

  saveFireData = (routes = null, data = []) => 
  {
    return firebase.database()
            .ref(this.url + routes)
            .set(data);
  };

  addFireData = (routes = null, data) => 
  {
    return firebase.database()
            .ref(this.url + routes)
            .push(data);
  }

  updateFireData = (routes = null, data) => 
  {
    return firebase.database()
            .ref(this.url + routes)
            .update(data);
  }

  deleteData = (routes = null) => 
  {
    return firebase.database()
            .ref()
            .remove(routes);
  }
  
  objectToArray = (obj: object) => {
    var array = [], tempObject;
    for (var key in obj) 
    {
        tempObject = obj[key];
        if (typeof obj[key] == "object") {
            tempObject = this.objectToArray(obj[key]);
        }
        array[key] = tempObject;
    }
    return array;
  }

  saveFireStoreData(routes: string, data: any) {
    console.log(routes);
    return this.firestore
      .doc(routes).set(data);
  }

  addFireStoreData(routes: string, data: any) {
    return this.firestore
      .collection(routes).add(data);
  }
 
  getFireStoreData(routes: string)  {
    return this.firestore.doc(routes).get();
  }

  getFireStoreCollection(routes: string)  {
    // if(doc)
    // return this.firestore.collection(routes).doc(doc).get();
    return this.firestore.collection(routes).get();
  }

  deleteFireStoreData(routes: string) {
    return this.firestore
      .doc(routes).delete();
  }

  updateFireStoreData(routes: string, data: any) {
    return this.firestore
      .doc(routes).set(data, {merge: true});
  }
}
