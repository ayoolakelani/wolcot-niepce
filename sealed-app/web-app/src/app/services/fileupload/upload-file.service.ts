import { FileUpload } from "../../models/FileUpload";
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';


import { Observable, pipe } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UploadFileService {

  private basePath = '/uploads/cac';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
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
          this.saveFileData(fileUpload);
          
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

 

  private saveFileData(fileUpload: FileUpload) {
   
    return this.afs.doc(this.basePath+`/${fileUpload.requestId}`).set({
      key : fileUpload.key,
      name : fileUpload.name,
      url : fileUpload.url
    });
    //this.afs.list(this.basePath).push(fileUpload);
  }

 

  deleteFileUpload(fileUpload: FileUpload) {
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
