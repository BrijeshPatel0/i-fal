import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComponentsService } from "../components.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileModel } from "../teacher.modal";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
// import beginner_wordsData from '../beginner_words.json';

export interface BeginnerWords {
  english: any;
  hebrew: any;
  spanish: any;
  sentence: any;
}

@Component({
  selector: "app-membership",
  templateUrl: "./membership.component.html",
  styleUrls: ["./membership.component.css"],
})
export class MembershipComponent implements OnInit {
  pricingListed: any;
  Loader: boolean = true;
  profileModel!: ProfileModel;
  paymentStatus: any;
  styleExp: any = "none";
  styleExpClancel: any = "none";
  styleHeaer: any = "none";
  frequncy: any;
  getProfileData: any;
  currencySymbol: any;
  isCancel: boolean = true;
  submitted: boolean = false;
  // BeginnerWords:BeginnerWords = beginner_wordsData;
  public directionController = new TextDirectionController();
  myControl = new FormControl("",    { validators: [Validators.required] });
  options: string[] = [
    "Google ads",
    "Facebook/Instagram ads",
    "Got recommendation from friend",
  ];
  headeSlug: any;
  filteredOptions!: Observable<string[]>;

  constructor(
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.profileModel = new ProfileModel();
    this.componentsService.currentMessage.subscribe(
      (message) => {

        this.directionController.textDirection = message;
        if(this.directionController.textDirection == 'ltr'){
this.options =  [
  "Google ads",
  "Facebook/Instagram ads",
  "Got recommendation from friend",
];
        }else{
          this.options =  [
            "פרסום בגוגל /גוגל",
            "פייסבוק / אינסטגרם",
            "קיבלתי המלצה מחבר",
          ];
        }
      }
    );
    this.pricingListed = {};
    this.styleExp = "none";
    this.activatedRoute.queryParams.subscribe((params) => {
      this.paymentStatus = params["paymentStatus"]
        ? params["paymentStatus"]
        : "";
    });
    if (this.paymentStatus == "Done") {
      this.styleExp = "block";
      this.router.navigate(["/i-fal-menu/member"]);
    } else if (this.paymentStatus == "NOTDONE") {
      this.snackBar.open("Payment NOT DONE", "", {
        panelClass: ["error", this.directionController.textDirection],
        direction: this.directionController.textDirection,
      });
      this.router.navigate(["/i-fal-menu/member"]);
    }
  }
  ngOnInit() {
    debugger;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value!.length >= 2 ? this._filter(value!) : []))
      // map(value =>  this._filter(value || '')),
    );
    // $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MembershipMN").addClass("active");
    this.Loader = true;
    this.getPricing();
    this.getProfile();
    this.getProfileData = localStorage.getItem("getProfile");
    this.getProfileData = JSON.parse(this.getProfileData);
    // console.log(this.getProfileData.country_code);
    if (this.getProfileData.country_code == "+972") {
      this.currencySymbol = "₪";
    } else {
      this.currencySymbol = "€";
    }

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getPricing() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService.getPricing(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        this.pricingListed = response.response;
      } else {
      }
      this.Loader = false;
    });
  }
  openCancelConfirmation() {
    this.getProfileData = localStorage.getItem("getProfile");
    this.getProfileData = JSON.parse(this.getProfileData);
    // console.log(this.getProfileData.payment_date);
    let datestring = "01-10-2022 06:50:05";
    let date = this.getProfileData.payment_date.split(" ");
    // console.log(date[0], date[1], "split");
    let dateDate = date[0].split("-");
    // console.log(dateDate[0], dateDate[1], dateDate[2], "splitDate");
    var NewDate =
      dateDate[2] + "-" + dateDate[1] + "-" + dateDate[0] + " " + date[1];
    // console.log(NewDate, "newDate");

    var current1 = new Date(NewDate + " UTC");

    var pasttimestamp = current1.getTime();

    // const current = new Date();
    const now = new Date();
    const current = new Date();
    var currenttimestamp = current.getTime();
    // console.log(pasttimestamp, currenttimestamp, current1, current, "imestamp");
    var defrent = currenttimestamp - pasttimestamp;
    // console.log(defrent);

    if (defrent < 86400000) {
      this.isCancel = false;
      this.styleExpClancel = "block";
    } else {
      this.isCancel = true;
      this.styleExpClancel = "block";
    }
  }
  canceliCreditSubscription() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };

    this.componentsService.canceliCreditSubscription(commonData).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.profileModel = response.response;
          this.ngOnInit();
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
        this.Loader = false;
      },
      (errer) => {
        this.Loader = false;
      }
    );
  }
  getProfile() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    var date = "GMT" + moment(new Date()).format("Z");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      timezone: date,
    };
    this.componentsService.getProfile(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        // if (response.response.has_heard == "0") {
        //   this.styleHeaer = "block";
        // }
        localStorage.setItem("getProfile", JSON.stringify(response.response));
        this.profileModel = response.response;
        this.profileModel.is_subscription_active =
          response.response.is_subscription_active.toString();
        this.frequncy = response.response.frequncy;
        this.activate(response.response.frequncy);
        this.changeDetector.detectChanges();
      } else {
      }
      this.Loader = false;
    });
  }

  paymentAmount(frequency: any) {
    var id = this.componentsService.encrypt(frequency);
    this.router.navigate(["/i-fal-menu/payment"], {
      queryParams: { id: id },
    });
  }
  activate(Class: any) {
    let class1 = " ." + Class;

    $(".packagesec .row .col-lg-3")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(class1).addClass("active");
  }
  closePopup() {
    this.styleExp = "none";

    this.styleHeaer = "block";
  }
  closePopupClancel() {
    this.styleExpClancel = "none";
  }
  closePopup1() {
    this.styleHeaer = "none";
  }
  
  
  selectoption(option: any) {
    debugger;
    console.log(option);
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    var slug;
    if (option == "Google ads") {
      slug = "GOOGLE_ADS";
    } else if (option == "Got recommendation from friend") {
      slug = "RECOMMENDATION_FROM_FRIEND";
    } else if (option == "Facebook/Instagram ads") {
      slug = "FACEBOOK_INSTAGRAM_ADS";
    }
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      slug: slug,
      value: option,
    };
    this.componentsService
      .hearAboutiFal(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.pricingListed = response.response;
          this.styleHeaer = "none";
        } else {
          this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});

        }
        this.Loader = false;
      });
  }
  onAboutSubmit() {
    debugger;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    this.submitted = true;
    if (this.myControl.invalid) {
      this.submitted = true;
      return;
    }
    if (!this.myControl.invalid) {
      const commonData = {
        language: environment.language,
        userId: userId,
        sessionId: sessionId,
        slug: "OTHER",
        value: this.myControl.value,
      };
      this.Loader = true;
      this.submitted = false;
      this.componentsService
        .hearAboutiFal(commonData)
        .subscribe((response: any) => {
          if (response.success === 1) {
            this.pricingListed = response.response;
            this.styleHeaer = "none";
            this.headeSlug = null;
          } else {
            this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});

          }
          this.Loader = false;
        });
    }
  }
}
