import { Component, OnInit, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { ComponentsService } from "src/app/components/components.service";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { LoginModel } from "../auth.modal";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  registrationModel: LoginModel | undefined;
  registrationForm!: FormGroup;
  forgotpassmail!: FormGroup;
  emailReminder: boolean = false;
  separateDialCode = false;
  mobile: any;
  mobileData: any;
  countryCode: any;
  styleExp: any = "none";
  Loader: boolean = true;
  public user: any;
  public loggedIn!: boolean;
  name = "Angular " + VERSION.major;
  public directionController = new TextDirectionController();
  starRating = 0;
  currentRate = 3.14;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private authServiceSocial: SocialAuthService,
    private componentsService: ComponentsService
  ) {
    this.styleExp = "none";
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: [this.registrationModel?.email,[Validators.required]],
      password: [this.registrationModel?.password,[Validators.required]],
    });
    this.forgotpassmail = this.formBuilder.group({
      email: [""],
    });
    this.Loader = false;
    this.authServiceSocial.authState.subscribe((user: any) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }
  get f() {
    return this.forgotpassmail.get("email");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
return;
    }
    this.Loader = true;
    this.registrationModel = this.registrationForm.value;
    this.registrationModel!.loginType = "NORMAL";
    this.registrationModel!.deviceType = "WEB";
    this.registrationModel!.language = environment.language;

    // deviceType
    if (!this.registrationForm?.invalid) {
      this.authService
        .userLogin(this.registrationModel!)
        .subscribe((response: any) => {
          if (response.success === 1) {
            var newdate =  localStorage.getItem("AppSettingsDate");
            var  support_link = localStorage.getItem("support_link");
            let language = localStorage.getItem("lang");
            localStorage.clear();
            localStorage.setItem("AppSettingsDate",newdate!);
            localStorage.setItem("support_link",support_link!);
            localStorage.setItem("lang",language!);
            localStorage.setItem(
              "token",
              JSON.stringify(response.response.sessionId)
            );
            localStorage.setItem("userid", response.response.id);
            localStorage.setItem("sessionId", response.response.sessionId);
            localStorage.setItem(
              "appointment_count",
              response.response.appointment_count
            );
            localStorage.setItem("newLanding","");
            const getToken: any = localStorage.getItem("token");
            
            if (response.response.appointment_count == "0") {
              this.router.navigate(["/i-fal-menu/booklession"]);
            } else {
              this.router.navigate(["/i-fal-menu"]);
            }
            // this.snackBar.open(response.message, "", { panelClass: "success" });
          } else {
            this.snackBar.open(response.message, "", { panelClass: ["error", this.directionController.textDirection] , direction:this.directionController.textDirection});
          }
          this.Loader = false;
        });
    } else {
      this.Loader = false;
    }
  }

  onSubmitforgotpassmail() {
    if (this.forgotpassmail?.invalid) {
      return;
    }
    if (!this.forgotpassmail?.invalid) {
      const commonData = {
        language: environment.language,
        userId: "",
        sessionId: "",
        email: this.forgotpassmail.value.email,
      };
      this.authService.forgotPassword(commonData).subscribe((response: any) => {
        if (response.success === 1) {
          this.closePopup();
          this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] , direction:this.directionController.textDirection});
        } else {
          this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ] , direction:this.directionController.textDirection });
        }
      });
    }
  }
  onForgotpassword() {
    this.styleExp = "block";
  }
  closePopup() {
    this.styleExp = "none";
  }
}
