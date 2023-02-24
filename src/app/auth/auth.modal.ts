export class RegistrationModel {
  id?: number;
  first_name?: any;
  last_name?: any;
  email?: any;
  mobile?: any;
  country_code?: any;
  password?: any;
  totalRecords?: number;
  deviceType?: any = "WEB";
  loginType?: any = "NORMAL";
  language?: any ;
  firstname?: any;
  lastname?: any;
  deviceToken?: any;
  profileImage?: any;
  socialLoginId?: any;
  recaptcha_response?: any;
  deviceId?:any;
}

export class LoginModel {
  email?: string;
  password?: string;
  deviceType?: string = "WEB";
  loginType?: string = "NORMAL";
  language?: string;
  socialLoginId?:string;
  deviceId?:any;
}
export class Account {
  id?: string;
  facebookId?: string;
  name?: string;
  extraInfo?: string;
  token?: string;
}