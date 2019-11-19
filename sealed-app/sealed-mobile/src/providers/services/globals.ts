import { appConfig } from './../../../../shared/models/app-user';

import { Injectable, ViewChild } from '@angular/core';
import { AlertController, 
  ModalController, 
  ToastController, 
  ViewController, 
  LoadingController,
  ActionSheetController,
  App,
  Platform,
  Loading
} from 'ionic-angular';
import { StorageProvider } from './storage';
import { RequestProvider } from './request';


declare var $ :any;

@Injectable()
export class GlobalsProvider 
{
  setConfig(userId) {
    this.appConfig.login = true;
  }

  @ViewChild('myNav') view: ViewController
  os: any = (this.platform.is("ios")) ? 'ios' : this.platform.is("android") ? 'android' : (!this.platform.is('cordova')) ? 'web' : 'others' ;
  fullScreen: boolean = true;
 // refresher: appModels;
  loader: Loading;
  profile: any;
  //dataProviderLoader: appModels;
  color: any = {
    "default": "light",
    "warning": "warning",
    "successful": "success",
    "failed": "danger",
    "pending": "info",
  }


  private appConfig: appConfig = {
    login: false,
    fcm: null,
    access: null
  };

  get config() {return this.appConfig};

  constructor(
    public app: App,
    public platform: Platform,
   // public statusbar: StatusBar,
    public loading: LoadingController,
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
   // public localnotifications: LocalNotifications,
   // public socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController,
    public storage: StorageProvider,
    public api: RequestProvider
  )
  {
    this.storage.getItem("userdata")
    .then((profile: any) => {
      this.profile = profile;
    });

  }


  showLoader({cssClass = '', content = 'Loading...', dismissOnPageChange = true} = {}) {
    this.loader = this.loading.create({
      content: content,
      dismissOnPageChange :dismissOnPageChange,
      cssClass : cssClass
    });
    this.loader.present();
  }


  closeLoader()
  {
    this.loader.dismiss();
  }


  NotifyAlert(title = "Error", message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }


  ToastAlert(message,{duration = 3000, position = "top"} = {}){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position : position
    });
    toast.present();
  }

  // extra libarries functionality

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

  cutString(text: string, len: number) {    
      text = $($.parseHTML(text)).text();
      var i = 0;
      var wordsToCut = len;
      var wordsArray = text.split("");
      if(wordsArray.length>wordsToCut){
          var strShort = "";
          for(i = 0; i < wordsToCut; i++){
              strShort += wordsArray[i] + "";
          }   
          return strShort+"...";
      }else{
          return text;
      }
  }

  arrayToObject = (arr = []) =>
  {
      var rv = {};
      for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
      return rv;
  }


  objectToObject = (toObj, fromObj) => {
    Object.keys(toObj).forEach((key) => {
    //  console.log(key);
      if (toObj.hasOwnProperty(key)) { // or 
        {
          if(fromObj[key] !== null || fromObj[key] !== undefined)
             toObj[key] = fromObj[key] || toObj[key]; 
          if (typeof toObj[key] === 'object'  && typeof fromObj[key] === 'object' && (fromObj[key] !== null || fromObj[key] !== undefined)) 
          {
               this.objectToObject(fromObj[key],  toObj[key])
          }
        }
      }
  });
  }


   groupBy<T extends any, K extends keyof T>(array: T[], key: K | { (obj: T): string }): Record<string, T[]> {
    const keyFn = key instanceof Function ? key : (obj: T) => obj[key]
    return array.reduce(
      (objectsByKeyValue, obj) => {
        const value = keyFn(obj)
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
        return objectsByKeyValue
      },
      {} as Record<string, T[]>
    )
  }
}
