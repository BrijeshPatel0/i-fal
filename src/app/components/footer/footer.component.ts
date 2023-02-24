import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { format } from "date-fns";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  support_link: any;
  landgPage: boolean = false;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) {}
  termsOfUse: any;
  privacyPolicy: any;

  ngOnInit() {
    // console.log(environment.deviceId,"unic");
    
    this.componentsService.currentMessage.subscribe((message) => {
      this.directionController.textDirection = message;
      if (this.directionController.textDirection == "rtl") {
        this.termsOfUse = environment.api_url + "/terms-of-use-hw";
        this.privacyPolicy = environment.api_url + "/privacy-policy-hw";
      } else {
        this.termsOfUse = environment.api_url + "/terms-of-use";
        this.privacyPolicy = environment.api_url + "/privacy-policy";
      }
      setInterval(() => {
        this.modifyHeader();
      }, 100);
    });
    this.getAppSettings();
  }

  whatappLink() {
    const data = {
      language: environment.language,
      userId: "",
      sessionId: "",
    };
    this.componentsService.getAppSettings(data).subscribe((response: any) => {
      if (response.success === 1) {
        // this.isSuccess = true;
        // this.styleExp = "none";
        // this.styleExpConfirm = "block";
        // this.newAppointmentId = response.response.id;
        this.support_link = response.response.support_link;
        // console.log(this.support_link, "whattaspp");
      } else {
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      // this.Loader = false;
    });
  }
  getAppSettings() {
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");

    const data = {
      language: environment.language,
      userId: "",
      sessionId: "",
    };
    var date = localStorage.getItem("AppSettingsDate");
    var newdateChek = new Date();
    var newDateChek = format(newdateChek, "yyyy-MM-dd");
    if (localStorage.getItem("AppSettingsDate") != newDateChek) {
      var newdate = new Date();
      var newDate = format(newdate, "yyyy-MM-dd");
      localStorage.setItem("AppSettingsDate", newDate);
      // console.log(localStorage.getItem("AppSettingsDate"), "checksetting");

      this.componentsService.getAppSettings(data).subscribe((response: any) => {
        if (response.success === 1) {
          this.support_link = response.response.support_link;
          // console.log(this.support_link, "whattaspp");
          localStorage.setItem("support_link", this.support_link);
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        // this.Loader = false;
      });
    } else {
      this.support_link = localStorage.getItem("support_link");
    }
  }
  redirectHome(type: any) {
    if (type == "about") {
      this.router.navigate(["/about"]);
    } else {
      this.router.navigate(["/"], { queryParams: { pageSec: type } });
    }
  }
  practice:any;
  modifyHeader() {
    this.practice = location.pathname;
    this.router.url;
    if (location.pathname === "/lp" ) {
      this.landgPage = false;
    } else {
      this.landgPage = true;
    }

   
  }

}
