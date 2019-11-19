import { FileUpload } from '../../../../shared/models/FileUpload';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()

export class FirebaseStorageProvider
{
  
    ref: any = this.storage.ref;
    basePath: string ="";

    constructor(private afs: AngularFirestore, private storage: AngularFireStorage)
    {
        
    }
  
    saveFiles = (fileUpload: any): Observable<number> => {
        fileUpload.key = this.afs.createId();
        const filePath = `${this.basePath}/${fileUpload.key}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);
    
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              console.log('File available at', downloadURL);
              fileUpload.url = downloadURL;
              fileUpload.name = fileUpload.file.name;
             });
          })
        ).subscribe();
    
        return uploadTask.percentageChanges();
      }

    saveFileswithCB = (filepath:any, file: any, callback:any) =>
    {
        let storageTask = this.ref.child(filepath).put(file);
        storageTask.on('state_changed', (snapshot) => {
            var progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
            switch (snapshot['state']) {
              case firebase.storage.TaskState.PAUSED:
                callback('Upload is paused at ' + progress);
                break;
            //   case firebase.storage.TaskState.RUNNING:
            //     callback(progress);
            //     break;
              case firebase.storage.TaskState.SUCCESS:
                callback('Upload is successful');
                break;
              case firebase.storage.TaskState.ERROR:
                callback('Upload is unsuccessful');
                break;
            }
        }, (error) => {
            switch (error['code']) {
              case 'storage/unauthorized':
                callback("User doesn't have permission to access the object");
                break;
              case 'storage/canceled':
                callback("User canceled the upload");
                break;
              case 'storage/unknown':
                callback("Unknown error occurred, inspect error.serverResponse");
                break;
            }
        }, () => {
            storageTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    callback(downloadURL);
                }).catch((error) => {
                    callback(error);
                });
        });
    }

    deleteFiles = (filepath: string) =>
    {
        return this.ref.child(filepath).delete();
    }

    downloadImage = async (fileurl) =>
    {
        return await new Promise((resolve, reject) => {
            firebase.storage().refFromURL(fileurl).getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function() {
                    var reader = new FileReader();
                    reader.onload = () => {
                      resolve(reader.result);
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            })
            .catch(err => {
                reject(err.message);
            });
        })
    }

    deleteFileUpload(fileUpload: any) {
        this.deleteFileDatabase(fileUpload.requestId)
          .then(() => {
            this.deleteFileStorage(fileUpload.key);
            console.log("deleted file succesfully");
          })
          .catch(error => console.log(error));
      }
    
      private deleteFileDatabase(key: string) {
        return this.afs.doc<FileUpload>(`${this.basePath}/${key}`).delete();
      }
    
      private deleteFileStorage(name: string) {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
      }
}