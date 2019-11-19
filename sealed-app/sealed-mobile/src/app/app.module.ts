import { AngularFireDatabaseModule } from '@angular/fire/database';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings, UserProvider, Api } from '../providers';
import { MyApp } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../config/config';
import { Push } from '@ionic-native/push/ngx';
import { FcmProvider } from '../providers/firebase/fcm';
import { FirebaseDBProvider } from '../providers/firebase/firebasedb';
import { FirebaseAuthProvider } from '../providers/firebase/firebaseauth';
import { FirebaseStorageProvider } from '../providers/firebase/firebasestore';
import { StorageProvider } from '../providers/services/storage';
import { RequestProvider } from '../providers/services/request';
import { NetworkProvider } from '../providers/services/network';
import { GlobalsProvider } from '../providers/services/globals';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(), 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__sealedappdb'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    UserProvider,
    Camera,
    SplashScreen,
    StatusBar,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GlobalsProvider,
    FcmProvider, FirebaseDBProvider, FirebaseAuthProvider, FirebaseStorageProvider,
    StorageProvider, RequestProvider, NetworkProvider, ,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
