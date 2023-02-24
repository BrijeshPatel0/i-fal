import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";
import { RegistrationModel } from "src/app/auth/auth.modal";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { ProfileModel } from "../teacher.modal";
import { PasswordValidator } from "./password-validator";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  profileModel!: ProfileModel;
  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  registrationModel!: RegistrationModel;
  registrationForm!: FormGroup;
  CountryISO = CountryISO;
  mobile: any;
  mobileData: any;
  countryCode: any;
  dataURL: any;
  imagePreview: any;
  submitted: boolean = false;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  Loader: boolean = true;
  login_type:any;
  activeTabMenu: any = "Favorites Words";
  ageGroup:any=1;
  // validateForm: any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.componentsService.currentMessage.subscribe(message => this.directionController.textDirection = message)
    this.imagePreview = "assets/images/teacher/userProfile.jpg";
    this.profileModel = new ProfileModel()

  }

  ngOnInit() {
    this.getProfile();
    // $(".teachertab .test")
    //   .addClass("active")
    //   .siblings()
    //   .removeClass("active");
    $(".MYProfileMN").addClass("active");

    this.profileForm = this.formBuilder.group({
      first_name: [this.profileModel?.first_name],
      last_name: [this.profileModel?.last_name],
      email: [this.profileModel?.email],
      mobile: [this.profileModel?.mobile],
      alternate_email: [this.profileModel?.alternate_email],
    });
    // this.changePasswordForm = this.formBuilder.group({
    //   oldPassword: [""],
    //   newPassword: [""],
    //   confirmPassword: [""]
    // });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["",[Validators.required]],
      confirmNewPassword: ["", [Validators.required]]
    }, { validator: this.validateForm.bind(this) });
    this.profileForm.controls["mobile"].disable();

  }
  validateForm(formGroup: FormGroup) {
    let pass = formGroup.controls?.['newPassword'].value;
    let confirmPass = formGroup.controls?.['confirmNewPassword'].value;

    if (confirmPass == undefined || !confirmPass.length)
      return null;

    return pass && confirmPass && pass === confirmPass ? null : formGroup.controls?.['confirmNewPassword'].setErrors({ notSame: true })
  }
  get oldPassword() {
    return this.changePasswordForm.get("oldPassword");
  }
  get newPassword() {
    return this.changePasswordForm.get("newPassword");
  }
  get confirmNewPassword() {
    return this.changePasswordForm.get("confirmNewPassword");
  }
  getProfile() {
    this.Loader=true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    var date = "GMT" + moment(new Date()).format("Z");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      timezone:date
    };
    this.componentsService.getProfile(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        // this.profileModel = response.response;
        this.profileModel = response.response;
              localStorage.setItem("getProfile", JSON.stringify(response.response));
              if(response.response.thumbnail != ""){
                this.imagePreview = response.response.thumbnail;
              }
              this.profileModel!.mobile=response.response.country_code+response.response.mobile;
            
              this.profileForm.patchValue({
                ...response.response,
              });
              this.ageGroup = response.response.age_group
              this.Loader=false;
      } else {
              this.Loader=false;
      }

      // setTimeout(() => 
      // {
      //   this.Loader=false;
     
      // }, 200);
    });
  }

  onSubmit() {
    this.Loader=true;
    this.profileModel = this.profileForm.value;
    this.profileModel!.loginType = "NORMAL";
    this.profileModel!.deviceType = "WEB";
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    this.profileModel!.sessionId = sessionId;
    this.profileModel!.userId = userId;
    this.profileModel!.firstname = this.profileModel?.first_name;
    this.profileModel!.lastname = this.profileModel?.last_name;
    this.profileModel!.alternateEmail = this.profileModel?.alternate_email;
    this.profileModel!.profileImage = this.dataURL;
    this.profileModel!.language = environment.language;
    var form_data = new FormData();
    form_data.append("loginType", this.profileModel!.loginType);
    form_data.append("deviceType", this.profileModel!.deviceType);
    form_data.append("userId", this.profileModel!.userId);
    form_data.append("sessionId", this.profileModel!.sessionId);
    form_data.append("firstname", this.profileModel!.firstname);
    form_data.append("lastname", this.profileModel!.lastname);
    form_data.append("language", this.profileModel!.language);
    form_data.append("deviceId", environment.deviceId);
    form_data.append("ageGroup", this.ageGroup);
    if (this.dataURL != undefined) {
      form_data.append("profileImage", this.profileModel!.profileImage);
    }
    this.componentsService
      .updateProfile(form_data)
      .subscribe((
        response: any) => {
        if (response.success === 1) {
          this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ]   , direction:this.directionController.textDirection});
        } else {
          this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ] , direction:this.directionController.textDirection });
        }
        this.Loader=false;
      });
  }

  
  onChangePasswordSubmit() {
    // this.Loader=true;
    this.changePasswordForm.value
    if (this.changePasswordForm.invalid) {
      this.submitted = true;
      // this.Loader = false;
      return;
    }

    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.componentsService
      .changePassword(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.router.navigate(["/"]);
          this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ]   , direction:this.directionController.textDirection});
        } else {
          this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
        }
        this.Loader=false;
      });
  }

  handleImageChange(e: any) {
    if (this.componentsService.isValidFileType(e.target.files[0].name, "image")) {
      var input = e.target;
      this.dataURL = e.target.files[0];
      var reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.snackBar.open("Please select valid file type", "", {
        panelClass: ["error" , this.directionController.textDirection ],
        direction:this.directionController.textDirection
      });
    }
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
