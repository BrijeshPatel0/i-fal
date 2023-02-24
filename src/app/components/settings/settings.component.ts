import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SocialAuthService } from "angularx-social-login";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { NotificationModel, RemindersModel } from "../teacher.modal";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  Loader: boolean = true;
  styleExpConfirm: any = "none";
  styleExp: any = "none";
  styleExpLan: any = "none";
  languageName: any = "English";
  languageImage: any = "assets/images/us.svg";
  isActive: boolean = false;
  countryZone: any;
  message: any;
  brwserLang: any;
  landgPage: boolean = true;
  panelOpenState = false;
  notificationForm!: FormGroup;
  remindersForm!: FormGroup;
  notificationModel!: NotificationModel;
  remindersModel!: RemindersModel;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    public translateService: TranslateService,
    private authServiceSocial: SocialAuthService,
    private formBuilder: FormBuilder
  ) {
    this.getReminderSettings();
    this.notificationModel = new NotificationModel();
    this.remindersModel = new RemindersModel();
    this.componentsService.currentMessage.subscribe((message) => {
      this.directionController.textDirection = message;
      if (this.directionController.textDirection == "rtl") {
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        // this.selectLanguage('isr',this.languageName,this.languageImage)
      } else {
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        // this.selectLanguage('en',this.languageName,this.languageImage)
      }
    });
    this.translateService.addLangs(["en", "spn"]);
    this.componentsService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
    var lang = localStorage.getItem("lang");
    this.brwserLang = navigator.language || navigator.language;
    this.countryZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (lang != null) {
      if (lang == "isr") {
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        this.selectLanguage(lang, this.languageName, this.languageImage);
      } else {
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        this.selectLanguage(lang, this.languageName, this.languageImage);
      }
    } else {
      if (this.countryZone == "Asia/Jerusalem") {
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        this.selectLanguage("isr", this.languageName, this.languageImage);
        localStorage.setItem("lang", "isr");
      } else {
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        this.selectLanguage("en", this.languageName, this.languageImage);
        localStorage.setItem("lang", "en");
      }
    }
  }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      mail_session_confirmation: [
        this.notificationModel.mail_session_confirmation,
      ],
      mail_session_report: [this.notificationModel.mail_session_report],
    });
    this.remindersForm = this.formBuilder.group({
      whatsapp_3_hours: [this.remindersModel.whatsapp_3_hours],
      whatsapp_30_minutes: [this.remindersModel.whatsapp_30_minutes],
      whatsapp_5_minutes: [this.remindersModel.whatsapp_5_minutes],
      mail_10_minutes: [this.remindersModel.mail_10_minutes],
      ivr_2_5_minutes: [this.remindersModel.ivr_2_5_minutes],
      whatsapp: [this.remindersModel.whatsapp],
    });
    this.getAppSettings();

    // $(".teachertab .test")
    // .addClass("active")
    // .siblings()
    // .removeClass("active");
    $(".SettingsMN").addClass("active");
    this.Loader = false;
    // this.translateService.addLangs(['en', 'spn']);
    // this.translateService.setDefaultLang('en');
    // this.translateService.use('en');
  }

  logOut() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: "EN",
      userId: userId,
      sessionId: sessionId,
    };

    this.componentsService.userLogout(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        var newdate = localStorage.getItem("AppSettingsDate");
        var newdate1 = localStorage.getItem("wordDate");
        var support_link = localStorage.getItem("support_link");
        let language = localStorage.getItem("lang");
        localStorage.clear();
        localStorage.setItem("AppSettingsDate", newdate!);
        localStorage.setItem("wordDate", newdate1!);
        localStorage.setItem("support_link", support_link!);
        localStorage.setItem("lang", language!);
        this.authServiceSocial.signOut();
        this.router.navigate(["/"]);
        if (this.directionController.textDirection == "ltr") {
          this.snackBar.open("Logged out", "", {
            panelClass: ["success", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        } else {
          this.snackBar.open("התנתק", "", {
            panelClass: ["success", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      this.Loader = false;
    });
  }
  selectLanguage(lang: any, languageName: any, languageImage: any) {
    // console.warn('sssss');
    this.translateService.use(lang);
    localStorage.setItem("lang", lang);
    this.languageName = languageName;
    this.languageImage = languageImage;
    this.styleExpLan = "none";
    this.isActive = false;
    this.directionController = new TextDirectionController();
    this.reloadCurrentRoute();
    // console.log(this.router.url,"url");
    // window.location.reload();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    // if(currentUrl == "/i-fal-menu" || currentUrl == "/i-fal-menu/analytics"){
    //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //       this.router.navigate([currentUrl]);
    //   });
    // }
    this.newMessage();
  }
  newMessage() {
    this.componentsService.changeMessage(
      this.directionController.textDirection
    );
  }
  selectDrop() {
    this.styleExpConfirm = "block";
  }
  openLogout() {
    this.styleExp = "block";
  }
  closeLogout() {
    this.styleExp = "none";
  }

  openClosePopup(isActive: any) {
    this.isActive = !isActive;
    if (this.isActive) {
      this.styleExpLan = "block";
      this.isActive = true;
    } else {
      this.styleExpLan = "none";
    }
  }

  getAppSettings() {
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");

    const data = {
      language: environment.language,
      userId: "",
      sessionId: "",
    };
    // var date = localStorage.getItem("AppSettingsDate");
    // var newdateChek = new Date();
    // var newDateChek = format(newdateChek, "yyyy-MM-dd");
    // if (localStorage.getItem("AppSettingsDate") != newDateChek) {
    //   var newdate = new Date();
    //   var newDate = format(newdate, "yyyy-MM-dd");
    //   localStorage.setItem("AppSettingsDate", newDate);
    // console.log(localStorage.getItem("AppSettingsDate"), "checksetting");

    this.componentsService.getAppSettings(data).subscribe((response: any) => {
      if (response.success === 1) {
        console.log(response.response);

        // this.support_link = response.response.support_link;
        // console.log(this.support_link, "whattaspp");
        // localStorage.setItem("support_link", this.support_link);
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      // this.Loader = false;
    });
    // } else {
    //   // this.support_link = localStorage.getItem("support_link");
    // }
  }
  onNotificationSubmit() {
    debugger;
    this.Loader = true;
    if (this.notificationForm.invalid) {
      return;
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    this.Loader = true;
    this.notificationModel = this.notificationForm.value;
    this.notificationModel!.sessionId = sessionId;
    this.notificationModel!.userId = userId;
    this.notificationModel!.language = environment.language;
    this.notificationModel.mail_session_confirmation = this.notificationModel
      .mail_session_confirmation
      ? "1"
      : "0";
    this.notificationModel.mail_session_report = this.notificationModel
      .mail_session_report
      ? "1"
      : "0";

    // deviceType
    if (!this.notificationForm?.invalid) {
      this.componentsService
        .setReminderSettings(this.notificationModel!)
        .subscribe((response: any) => {
          if (response.success === 1) {
            console.log(response);
            this.getReminderSettings();
            this.snackBar.open(response.message, "", { panelClass: "success" });
          } else {
            this.snackBar.open(response.message, "", {
              panelClass: ["error", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
          }
          this.Loader = false;
        });
    } else {
      this.Loader = false;
    }
  }
  onRemindersSubmit() {
    debugger;
    this.Loader = true;
    if (this.remindersForm.invalid) {
      return;
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    this.Loader = true;
    this.remindersModel = this.remindersForm.value;
    this.remindersModel!.sessionId = sessionId;
    this.remindersModel!.userId = userId;
    this.remindersModel!.language = environment.language;
    if (this.remindersModel.whatsapp == "whatsapp_3_hours") {
      this.remindersModel.whatsapp_3_hours = "1";
      this.remindersModel.whatsapp_30_minutes = "0";
      this.remindersModel.whatsapp_5_minutes = "0";
    } else if (this.remindersModel.whatsapp == "whatsapp_30_minutes") {
      this.remindersModel.whatsapp_3_hours = "0";
      this.remindersModel.whatsapp_30_minutes = "1";
      this.remindersModel.whatsapp_5_minutes = "0";
    } else if (this.remindersModel.whatsapp == "whatsapp_5_minutes") {
      this.remindersModel.whatsapp_3_hours = "0";
      this.remindersModel.whatsapp_30_minutes = "0";
      this.remindersModel.whatsapp_5_minutes = "1";
    }
    this.remindersModel.mail_10_minutes = this.remindersModel.mail_10_minutes ?"1":"0";
    this.remindersModel.ivr_2_5_minutes = this.remindersModel.ivr_2_5_minutes ?"1":"0";
    if (!this.remindersForm?.invalid) {
      this.componentsService
        .setReminderSettings(this.remindersModel!)
        .subscribe((response: any) => {
          if (response.success === 1) {
            console.log(response);
            this.getReminderSettings();
            this.snackBar.open(response.message, "", { panelClass: "success" });
          } else {
            this.snackBar.open(response.message, "", {
              panelClass: ["error", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
          }
          this.Loader = false;
        });
    } else {
      this.Loader = false;
    }
  }
  getReminderSettings() {
    debugger;
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");

    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService
      .getReminderSettings(data!)
      .subscribe((response: any) => {
        if (response.success === 1) {
          console.log(response);
   
          // this.remindersModel.whatsapp_30_minutes =
          //   response.response.whatsapp_30_minutes == 1 ? true : false;
          // this.remindersModel.whatsapp_5_minutes =
          //   response.response.whatsapp_5_minutes == 1 ? true : false;
          // this.remindersModel.whatsapp_3_hours =
          //   response.response.whatsapp_3_hours == 1 ? true : false;
          this.notificationModel.mail_session_confirmation =
            response.response.mail_session_confirmation == 1 ? true : false;
          this.notificationModel.mail_session_report =
            response.response.mail_session_report == 1 ? true : false;
          if (response.response.whatsapp_3_hours == 1) {
            this.remindersModel.whatsapp = "whatsapp_3_hours";
          } else if (response.response.whatsapp_30_minutes == 1) {
            this.remindersModel.whatsapp = "whatsapp_30_minutes";
          } else if (response.response.whatsapp_5_minutes == 1) {
            this.remindersModel.whatsapp = "whatsapp_5_minutes";
          }
          this.remindersModel.ivr_2_5_minutes =
          response.response.ivr_2_5_minutes == 1 ? true : false;
        this.remindersModel.mail_10_minutes =
          response.response.mail_10_minutes == 1 ? true : false;
          // this.snackBar.open(response.message, "", { panelClass: "success" });
          this.remindersForm.patchValue(this.remindersModel);
          this.notificationForm.patchValue(this.notificationModel);
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
      });
  }
}
