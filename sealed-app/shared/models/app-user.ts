
export interface appConfig {
  login: boolean,
  access: string,
  fcm: string,
};

export interface AppUser {
  uid : string
  name : string;
  email : string;
  isAdmin? : boolean;
  photourl? : string;
  phoneNumber? : string;
  sex? : boolean;
  isValid? : boolean;
  location? : string;
  
}

export interface fireEmailUser {
  email: string,
  password: string
}

export interface userProfile {
  email: string,
  displayName: string ,
  phoneNumber: string,
  photoURL: string,
  providerId: string,
  uid: string,
  badLogins : number ,
  loginCount : number,
  userData : AppUser,
};




