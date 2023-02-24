import { Injectable } from "@angular/core";
import { CommonService } from "../service/common.service";
import { LoginModel, RegistrationModel } from "./auth.modal";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSignUpURL = "apis/userSignUp1";
  private userLoginURL = "apis/userLogin";
  private forgotPasswordURL = "apis/forgotPassword";

  constructor(private commonService: CommonService) {}

  userSignUp(registrationModel: any) {
    return this.commonService.post(this.userSignUpURL, registrationModel);
  }
  userLogin(registrationModel: LoginModel) {
    return this.commonService.post(this.userLoginURL, registrationModel);
  }
  forgotPassword(forgotPasswordEmail: any) {
    return this.commonService.post(this.forgotPasswordURL, forgotPasswordEmail);
  }
}
