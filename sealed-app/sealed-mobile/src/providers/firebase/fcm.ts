import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { GlobalsProvider } from '../services/globals';
import { FirebaseDBProvider } from './firebasedb';
import { FirebaseAuthProvider } from './firebaseauth';
import { pushConfig } from '../../config/config';


@Injectable()

export class FcmProvider {
  fire: any;

  constructor(
    private toastCtrl: ToastController,
    private push: Push,
    private platform: Platform,
    private fireauth: FirebaseAuthProvider,
    private firedb: FirebaseDBProvider,
    private globals: GlobalsProvider
  ) 
  
  {
    this.globals.storage.getItem("userdata")
      .then((user: any) => {
        this.globals.profile = user;
      });

    if (!this.platform.is('cordova')) {
      try {
        this.fire = firebase.messaging();
        this.getPwaToken()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        console.log('Unable to Instantiate Firebase Messaing', e);
      }
    }
    else if (this.platform.is('android')
      || this.platform.is('ios')
      || this.platform.is('wp')) {
      this.getCordovaToken()
        .then((res) => {

        })
        .catch((err) => {

        });
    }
  }

  enableNotifications = async () => {
    return await new Promise((resolve, reject) => {
      this.fire.requestPermission()
        .then(() => {
          resolve(this.updateToken());
        })
        .catch((err) => {
          reject("error requesting permission for fire" + JSON.stringify(err));
        });
    })
  }

  updateToken = async () => {
    return await new Promise((resolve, reject) => {
      this.fire.getToken()
        .then((currentToken: any) => {
          if (currentToken) {
            return this.saveToken(currentToken);
          } else {
            resolve('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          reject("error updating fire " + JSON.stringify(err));
        });
    })
  }

  saveToken = async (token: any) => {
    if (!token) return;
    this.globals.profile.fcm = this.globals.config.fcm = token;
    this.globals.storage.saveItem("appconfig", this.globals.config)
      .catch((err: any) => {
        console.log("Storage error ", err);
      });

    this.firedb.saveFireData("users/" + this.fireauth.currentUserId(), this.globals.profile)
      .then((res: any) => {
        this.globals.storage.saveItem("userdata", this.globals.profile)
          .catch((err: any) => {
            console.log("Storage error ", err);
          });
      })
      .catch((err: any) => {
        console.log("error saving fire", JSON.stringify(err));
      });
  }

  getPwaToken = async () => {
    return await new Promise((resolve, reject) => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then((registration) => {
            this.fire.useServiceWorker(registration);
            this.enableNotifications()
              .then((res) => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch((err) => {
            reject("Error in pwa" + JSON.stringify(err));
          });
      }
      else {
        reject("no service workers");
      }
    })
  }

  getCordovaToken = async () => {
    let token;

    if (this.platform.is('android')) {
      token = await this.fire.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.fire.getToken();
      await this.fire.grantPermission();
    }

    return this.saveToken(token)
  }

  getCordovaTokenOnRefresh = async () => {
    let token;

    if (this.platform.is('android')) {
      token = await this.fire.onTokenRefresh()
    }

    if (this.platform.is('ios')) {
      token = await this.fire.getToken();
      await this.fire.grantPermission();
    }

    return this.saveToken(token)
  }

  pwaForegroundFCMNotification = () => {
    try {
      this.fire = firebase.messaging();
      this.fire.onMessage((payload) => {
        const toast = this.toastCtrl.create({
          message: JSON.stringify(payload),
          duration: 3000
        });
        toast.present();
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  nativePushNotification(callback: any) {
    try {
      this.push.hasPermission()
        .then((res: any) => {
          if (!res.isEnabled) {
            const toast = this.globals.toastCtrl.create({
              message: 'We do not have permission to send push notifications',
              duration: 7000
            });
            toast.present();
          }
        })
      // to initialize push notifications
      const options: PushOptions = pushConfig;
      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
        callback(notification);
      });

      pushObject.on('registration').subscribe((data: any) => {
        // if (this.globals.config.fcm !== data.registrationId) {
        //   this.saveToken(data.registrationId);
        // }
      });

      pushObject.on('error').subscribe(error => {
        const toast = this.globals.toastCtrl.create({
          message: 'Error with Push plugin ' + JSON.stringify(error),
          duration: 3000
        });
        toast.present();
      });
    } catch (ex) {
      console.log('Error with Push plugin ' + JSON.stringify(ex));
    }
  }
}