import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NavigationEnd, Router } from "@angular/router";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { ReCaptcha2Component } from "ngx-captcha";
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from "ngx-intl-tel-input";
import { ComponentsService } from "src/app/components/components.service";
import { ProfileModel } from "src/app/components/teacher.modal";
import { AccountService } from "src/app/service/Account.service";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { LoginModel, RegistrationModel } from "../auth.modal";
import { AuthService } from "../auth.service";
declare var AppleID: any;

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationComponent implements OnInit {
  registrationModel: RegistrationModel | undefined;
  loginModel: LoginModel | undefined;

  registrationForm!: FormGroup;
  userDetail: ProfileModel | undefined;
  emailReminder: boolean = false;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  mobile: any;
  mobileData: any;
  countryCode: any;
  styleExp: any = "none";
  activeTabMenu: any = "Favorites Words";
  dataURL: any;
  imagePreview: any;
  browserLang: any;
  countryPhone: any = CountryISO.India;
  loginType: any;
  socialLoginId: any;
  token: any | undefined;
  recaptchaReset: any;
  recaptchaSign: any;
  submitted: boolean = false;
  submittedR: boolean = false;
  isRecaptchaSign: boolean = false;
  isRecaptchaReset: boolean = false;
  Loader: boolean = true;
  isPasswords: boolean = true;
  // public user: any;
  // public loggedIn!: boolean;
  // preferredCountries: CountryISO[] = [
  //   CountryISO.UnitedStates,
  //   CountryISO.UnitedKingdom,
  // ];
  ageGroup:any=1;
  isDisabled: boolean = true;
  otp: any;
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  @HostListener("window:popstate", ["$event"])
  aFormGroup!: FormGroup;
  @ViewChild("captchaElem") captchaElem: ReCaptcha2Component | undefined;
  @ViewChild("langInput") langInput: ElementRef | undefined;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: "light" | "dark" = "light";
  public size: "compact" | "normal" = "normal";
  public lang = "en";
  public type!: "image" | "audio";
  // TooltipLabel = TooltipLabel;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.Israel];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });
  onPopState(event: any) {
    if (this.userDetail?.id != undefined) {
      this.deleteUser();
    } else {
    }
  }
  @HostListener("window:beforeunload") goToPage() {
    // console.log("window refreshed");
  }

  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "50px",
      height: "50px",
    },
  };
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private accountService: AccountService,
    private authServiceSocial: SocialAuthService
  ) {
    this.imagePreview = "assets/images/teacher/userProfile.jpg";
    this.registrationModel = new RegistrationModel();
    // document.body.scrollTop = 0;
    // this.countryPhone=CountryISO.India;
    // this.browserLang = navigator.language || navigator.language
    // if(this.browserLang == "he"){
    //   this.countryPhone=CountryISO.Israel;
    // }else{
    //   this.countryPhone=CountryISO.India;
    // }
    var t = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (t == "Asia/Calcutta") {
      this.countryPhone = CountryISO.India;
    } else {
      this.countryPhone = CountryISO.Israel;
    }
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    this.token = undefined;
  }

  ngOnInit() {
    // this.apple1();
    this.Loader = false;
    // if (localStorage.getItem("recaptchaResetLocal") == "1") {
    //   this.isRecaptchaReset = true;
    // } else {
    //   this.isRecaptchaReset = false;
    // }
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ["", Validators.required],
    });
    $("body").addClass("body");
    if (localStorage.getItem("recaptchaSignLocal") == "1") {
      this.isRecaptchaSign = true;
      this.registrationForm = this.formBuilder.group({
        id: [this.registrationModel?.id],
        first_name: [this.registrationModel?.first_name,[Validators.required]],
        last_name: [this.registrationModel?.last_name,[Validators.required]],
        email: [this.registrationModel?.email,[Validators.required]],
        mobile: [this.registrationModel?.mobile,[Validators.required]],
        country_code: [this.registrationModel?.country_code],
        password: [this.registrationModel?.password,[Validators.required]],
        recaptcha: ["", [Validators.required]],
        // profileImage: [this.registrationModel?.profileImage],
      });
    } else {
      this.registrationForm = this.formBuilder.group({
        id: [this.registrationModel?.id],
        first_name: [this.registrationModel?.first_name,[Validators.required]],
        last_name: [this.registrationModel?.last_name,[Validators.required]],
        email: [this.registrationModel?.email,[Validators.required]],
        mobile: [this.registrationModel?.mobile,[Validators.required]],
        country_code: [this.registrationModel?.country_code],
        password: [this.registrationModel?.password,[Validators.required]],
        recaptcha: [""],
        // profileImage: [this.registrationModel?.profileImage],
      });
    }

    this.changeDetector.detectChanges();
  
    // console.log(
    //   Intl.DateTimeFormat().resolvedOptions().timeZone,
    //   "timedjhdsjf"
    // );
    this.authServiceSocial.authState.subscribe((user) => {
      debugger
      this.user = user;
      this.loggedIn = user != null;
      console.log(user);
    
      if (this.user != null) {
        this.isPasswords = false;
        if(this.user.provider == "GOOGLE"){
          console.log(this.user.provider,"GOOGLE");
          
          this.emailReminderCheck();
          this.registrationModel!.first_name = this.user.firstName;
          this.registrationModel!.last_name = this.user.lastName;
          this.socialLoginId = this.user.id;
          this.registrationModel!.email = this.user.email;
          this.registrationModel!.loginType = "GOOGLE";
          this.loginType = "GOOGLE";
          this.onSubmitlogin(this.loginType, this.socialLoginId);
        }else{
          console.log(this.user.provider,"FACEBOOK");
          this.emailReminderCheck();
          this.registrationModel!.first_name = this.user.response.first_name;
          this.registrationModel!.last_name = this.user.response.last_name;
          this.socialLoginId = this.user.response.id;
          this.registrationModel!.email = this.user.response.email;
          this.registrationModel!.loginType = "FACEBOOK";
          this.loginType = "FACEBOOK";
          this.onSubmitlogin(this.loginType, this.socialLoginId);
        }
     
      }else{
        this.isPasswords = true;
      }
      this.registrationForm.patchValue(this.registrationModel!);
    });
  }
  get recaptchaV() {
    return this.registrationForm.get("recaptcha");
  }
  get recaptchaR() {
    return this.aFormGroup.get("recaptcha");
  }

  get first_name() {
    return this.registrationForm.get("first_name");
  }
  get last_name() {
    return this.registrationForm.get("last_name");
  }
  get mobilephone() {
    return this.registrationForm.get("mobile");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  newxtRegistration() {
    this.router.navigate(["/registration2"]);
  }

  onSubmit() {
    debugger
    this.Loader = true;
    if (localStorage.getItem("recaptchaSignLocal") == "1") {
      this.isRecaptchaSign = true;
    }
    if (this.isRecaptchaSign) {
      if (this.registrationForm.invalid) {
        this.submitted = true;
        this.Loader = false;
        return;
      }
    }else{
      if (this.registrationForm.invalid) {
        this.submitted = true;
        this.Loader = false;
        return;
      }
      
    }
    this.mobileData = this.registrationForm.value.mobile;
    if (this.mobileData.dialCode != undefined) {
      this.countryCode = this.mobileData.dialCode || null;
      this.mobile = this.mobileData.number || null;
    }
    this.registrationModel = this.registrationForm.value;
    this.registrationModel!.mobile = this.mobile;
    this.registrationModel!.country_code = this.countryCode;
    this.registrationModel!.firstname = this.registrationModel!.first_name;
    this.registrationModel!.lastname = this.registrationModel!.last_name;
    this.registrationModel!.profileImage = this.dataURL;
    this.registrationModel!.recaptcha_response = this.recaptchaSign
      ? this.recaptchaSign
      : null;
    if ((this.loginType == "FACEBOOK" && this.socialLoginId != undefined)) {
      this.registrationModel!.loginType = "FACEBOOK";
    }
    else if ((this.loginType == "GOOGLE" && this.socialLoginId != undefined)) {
      this.registrationModel!.loginType = "GOOGLE";
    }
    else if ((this.loginType == "APPLE" && this.socialLoginId != undefined)) {
      this.registrationModel!.loginType = "APPLE";
    } else {
      this.registrationModel!.loginType = "NORMAL";
    }
    this.registrationModel!.deviceType = "WEB";
    this.registrationModel!.language = environment.language;
    var form_data = new FormData();
    form_data.append("loginType", this.registrationModel!.loginType);
    form_data.append("deviceType", this.registrationModel!.deviceType);
    form_data.append("firstname", this.registrationModel!.firstname);
    form_data.append("lastname", this.registrationModel!.lastname);
    form_data.append("language", this.registrationModel!.language);
    form_data.append("mobile", this.registrationModel!.mobile);
    form_data.append("email", this.registrationModel!.email);
    form_data.append("password", this.registrationModel!.password);
    form_data.append("country_code", this.registrationModel!.country_code);
    form_data.append("deviceId", environment.deviceId);
    form_data.append("ageGroup", this.ageGroup);
    if (this.recaptchaSign != null) {
      form_data.append(
        "recaptcha_response",
        this.registrationModel!.recaptcha_response
      );
    }
    if (this.dataURL != undefined) {
      form_data.append("profileImage", this.registrationModel!.profileImage);
    }
    if (this.socialLoginId != undefined) {
      form_data.append("socialLoginId", this.socialLoginId);
    }
    // deviceType
    if (!this.registrationForm?.invalid) {
      this.authService.userSignUp(form_data).subscribe((response: any) => {
        if (response.success === 1) {
          // localStorage.setItem("recaptchaSignLocal", "1");
          this.isRecaptchaSign = true;
          this.userDetail = response.response;
          this.styleExp = "block";
          // this.router.navigate(["/login"]);
          // this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] });
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.aFormGroup.reset();
        this.registrationForm.get("recaptcha")?.reset();
        this.onConfigChange();
        this.Loader = false;
      });
      // this.submitted = true;
      // this.masterPatientLocationModel = this.masterPatientLocationForm.value;
      // this.masterPatientLocationService.create(this.masterPatientLocationModel).subscribe((response: any) => {
      //   this.submitted = false;
      //   if (response.statusCode == 200) {
      //     this.notifier.notify('success', response.message)
      //     this.closeDialog('save');
      //   } else {
      //     this.notifier.notify('error', response.message)
      //   }
      // });
      // routerLink="/login"
    } else {
      this.Loader = false;
    }
  }
  emailReminderCheck() {
    this.emailReminder = true;
  }
  loginexistinguser() {
    this.router.navigate(["/login"]);
  }
  onOtpChange(otp: any) {
    if (otp.length == 6) {
      this.isDisabled = false;
      this.otp = otp;
    } else {
      this.isDisabled = true;
    }
  }
  userVerification() {
    this.Loader = true;
    const data = {
      otp: this.otp,
      language: environment.language,
      userId: this.userDetail?.id,
      sessionId: this.userDetail?.sessionId,
    };
    this.componentsService.userVerification(data).subscribe((response: any) => {
      if (response.success === 1) {
        this.router.navigate(["/login"]);
        this.snackBar.open(response.message, "", {
          panelClass: ["success", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }

      if (response.success === 1) {
        localStorage.setItem(
          "token",
          JSON.stringify(this.userDetail!.sessionId)
        );
        localStorage.setItem("userid", this.userDetail!.id);
        localStorage.setItem("sessionId", this.userDetail!.sessionId);
        localStorage.setItem(
          "appointment_count",
          this.userDetail!.appointment_count
        );
        const getToken: any = localStorage.getItem("token");
        if (this.userDetail!.appointment_count == "0") {
          this.router.navigate(["/i-fal-menu/booklession"]);
        } else {
          this.router.navigate(["/i-fal-menu"]);
        }
        this.snackBar.open(response.message, "", {
          panelClass: ["success", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
    });
    this.Loader = false;
  }
  closePopup() {
    this.deleteUser();
    this.recaptchaReset = null;
    this.submitted = false;
    this.submittedR = false;

    this.aFormGroup.reset();
    this.registrationForm.get("recaptcha")?.reset();
  }
  deleteUser() {
    this.Loader = true;
    const data = {
      language: environment.language,
      userId: this.userDetail?.id,
      sessionId: this.userDetail?.sessionId,
    };
    this.componentsService.deleteUser(data).subscribe((response: any) => {
      if (response.success === 1) {
        this.styleExp = "none";
        this.ngOnInit();
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });

        // this.router.navigate(["/i-fal-menu"]);
      }
    });
    this.Loader = false;
  }
  handleImageChange(e: any) {
    if (
      this.componentsService.isValidFileType(e.target.files[0].name, "image")
    ) {
      var input = e.target;
      this.dataURL = e.target.files[0];
      var reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.snackBar.open("Please select valid file type", "", {
        panelClass: ["error", this.directionController.textDirection],
        direction: this.directionController.textDirection,
      });
    }
  }
  reSendOTP() {
this.Loader = true;
      if (this.aFormGroup?.invalid) {
        this.submittedR = true;
        this.Loader = false;
        return;
      }

      if(!this.aFormGroup?.invalid){
        const data = {
          language: environment.language,
          userId: this.userDetail?.id,
          sessionId: this.userDetail?.sessionId,
          deviceType: "WEB",
          recaptcha_response: this.recaptchaReset ? this.recaptchaReset : null,
        };
        this.componentsService.reSendOTP(data).subscribe((response: any) => {
          if (response.success === 1) {
            localStorage.setItem("recaptchaResetLocal", "1");
            // this.styleExp = "none";
            this.snackBar.open(response.message, "", {
              panelClass: ["success", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
          } else {
            this.snackBar.open(response.message, "", {
              panelClass: ["error", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
    
            // this.router.navigate(["/i-fal-menu"]);
          }
          this.aFormGroup.reset();
          this.registrationForm.get("recaptcha")?.reset();
          this.Loader = false;
        });
      }else{
        this.Loader = false;
      }
  
  }
  login() {
    this.accountService.login();
  }
  //Logion
  // signInWithFB(): void {
  //   this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
  //     if(userData.idToken){

  //     } else {
  //       alert('danger')
  //     }
  //  });
  //   // this.router.navigate(["/login"]);

  // }
  // Logout Function
  // signOut(): void {
  //   this.authServiceSocial.signOut();
  // }
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;

  // ngOnInit(): void {
  //   this.authService.authState.subscribe(user => {
  //     this.user = user;
  //     this.loggedIn = user != null;
  //   });
  // }

  signInWithGoogle(): void {
    debugger
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }
  parseJwt(token: any) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  public async apple() {
    try {
      AppleID.auth.init({
        clientId: "com.ifal.service",
        scope: "name email",
        redirectURI: "https://i-fal-app.com/registration",
        state: "init",
        nonce: "test",
        usePopup: true, //or false defaults to false
      });
      const data = await AppleID.auth.signIn();
      var tokanValue = this.parseJwt(data.authorization.id_token);
      if (tokanValue != null) {
        this.emailReminderCheck();
        this.socialLoginId = tokanValue.sub;
        this.registrationModel!.email = tokanValue.email;
        this.registrationModel!.loginType = "APPLE";
        this.loginType = "APPLE";
        this.registrationForm.patchValue(this.registrationModel!);
        this.onSubmitlogin(this.loginType, this.socialLoginId);
      }
    } catch (error) {
    }
  }
  // public async apple1() {
  //   try {
  //     // AppleID.auth.init({
  //     //           clientId : 'VRSignIn',
  //     //           scope : 'name email',
  //     //           redirectURI : 'https://angular-apple-signin.stackblitz.io/apple-callback',
  //     //           state : 'init',
  //     //           nonce : 'test',
  //     //           usePopup : false //or false defaults to false
  //     //       });
  //     const data = await AppleID.auth.signIn();

  //   } catch (error) {
  //     //handle error.
  //   }
  // }
  onSubmitlogin(loginType: any, socialLoginId: any) {
    this.loginModel = this.registrationForm.value;
    this.loginModel!.loginType = loginType;
    this.loginModel!.deviceType = "WEB";
    this.loginModel!.language = environment.language;
    this.loginModel!.socialLoginId = socialLoginId;

    // deviceType
    this.authService.userLogin(this.loginModel!).subscribe((response: any) => {
      if (response.success === 1) {
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
        // const getToken: any = localStorage.getItem("token");
        if (response.response.appointment_count == "0") {
          this.router.navigate(["/i-fal-menu/booklession"]);
        } else {
          this.router.navigate(["/i-fal-menu"]);
        }
        // this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] });
      } else {
        // this.snackBar.open(response.message, "", {
        //   panelClass: ["error", this.directionController.textDirection],
        //   direction: this.directionController.textDirection,
        // });
      }
    });
  }
  handleSuccess(data: any) {
    this.recaptchaSign = data;
  }
  handleSuccessReset(data: any) {
    this.recaptchaReset = data;
  }
  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  loadComponent(event: any) {
    switch (event) {
      case 1:
        this.ageGroup= 1;
        break;
      case 2:
        this.ageGroup= 2;
        break;
      case 3:
        this.ageGroup= 3
        break;
      default:
        break;
    }
  }
}
