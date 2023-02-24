import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import format from "date-fns/format";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { SessionsModel } from "../teacher.modal";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.css"],
})
export class SessionsComponent implements OnInit {
  sessionsModelData: SessionsModel[] = [];
  sessionsModelList: SessionsModel[] = [];
  sessionsModel: SessionsModel | undefined;
  pastSessionsModelData: SessionsModel[] = [];
  pastSessionsModelList: SessionsModel[] = [];
  pastSessionsModel: SessionsModel | undefined;
  page: number = 0;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  Loader: boolean = true;
  direction: any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    
  }
  // isrealToOtherContryDate1(isrealDate: any) {

  //   const OtherDate = format(
  //     new Date(new Date(isrealDate + " GMT+0300  (GMT)").toUTCString()),
  //     "yyyy-MM-dd HH:mm:ss"
  //   );
  //   return OtherDate;

  // }
  // isrealToOtherContryDate(isrealDate: any) {
  //   var d = new Date();
  //   var curr_year = d.getFullYear()
  //   var zoneStarDay =new Date( curr_year + "-" + "03" + "-" + "25" + " 02:00").getTime();
  //   var zoneEndDay =new Date( curr_year + "-" + "10" + "-" + "30" + " 02:00").getTime();
  //   var newDay = new Date(isrealDate).getTime();
  //   var OtherDate = "";
  //   if(zoneStarDay < newDay && zoneEndDay > newDay){
  //      OtherDate = format(
  //       new Date(new Date(isrealDate + " GMT+0300 ").toUTCString()),
  //       "yyyy-MM-dd HH:mm:ss"
  //     );
  //   }else{
  //      OtherDate = format(
  //       new Date(new Date(isrealDate + " GMT+0200 ").toUTCString()),
  //       "yyyy-MM-dd HH:mm:ss"
  //     );
  //   }
  //   return OtherDate;
  // }
  // isrealToOtherContryNewDate(isrealDate: any) {
  //   var d = new Date();
  //   var curr_year = d.getFullYear()
  //   var zoneStarDay =new Date( curr_year + "-" + "03" + "-" + "25" + " 02:00").getTime();
  //   var zoneEndDay =new Date( curr_year + "-" + "10" + "-" + "30" + " 02:00").getTime();
  //   var newDay = new Date(isrealDate).getTime();
  //   var OtherDate = "";
  //   if(zoneStarDay < newDay && zoneEndDay > newDay){
  //      OtherDate = format(
  //       new Date(new Date(isrealDate + " GMT+0300 ").toUTCString()),
  //       "yyyy-MM-dd"
  //     );
  //   }else{
  //      OtherDate = format(
  //       new Date(new Date(isrealDate + " GMT+0200 ").toUTCString()),
  //       "yyyy-MM-dd"
  //     );
  //   }
  //   return OtherDate;
  // }
  // otherContryDateToIsrealDate(otherContryDate: string) {
  //   const isrealDate = new Date(otherContryDate).toLocaleString("sv-SE", {
  //     timeZone: "asia/Jerusalem",
  //   });

  //   return isrealDate;
  // }
  ngOnInit() {
  
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".SessionsMN").addClass("active");
    this.upcommingAppointmentForUser();
    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
  }
  upcommingAppointmentForUser() {
    this.page = 0;
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      page: 1,
    };
    this.componentsService
      .upcommingAppointmentForUser(commonData)
      .subscribe((response: any) => {
      
        try {
          if (response.success === 1) {
            this.sessionsModelData = response.response;
            this.sessionsModelList = [];
            this.totalItems = response.total_records;
            this.sessionsModelData.forEach((obj) => {
              this.sessionsModel = obj;
              let startDate = "";
              let endDate = "";
              obj.appointment_details!.forEach((obj1) => {
                this.sessionsModel!.appointmentId = obj1.id;
                startDate = obj.appointment_date + " " + obj1.from;
                endDate = obj.appointment_date + " " + obj1.to;
              });
              this.sessionsModel.startAppointmentDate =
                this.componentsService.isrealToOtherContryDate(startDate);
              this.sessionsModel.endAppointmentDate =
                this.componentsService.isrealToOtherContryDate(endDate);
              // this.sessionsModel.appointment_date = this.componentsService.isrealToOtherContryDate(
              //   obj.appointment_date
              // );
              this.sessionsModelList.push(this.sessionsModel);
            });
          } else {
          }
        } catch (error) {
          this.Loader = false;
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      });
  }

  pastAppointmentForUser() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      page: 1,
    };
    this.componentsService.pastAppointmentForUser(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            this.pastSessionsModelData = response.response;

            this.pastSessionsModelList = [];
            this.totalItems = response.total_records;
            this.pastSessionsModelData.forEach((obj) => {
              this.pastSessionsModel = obj;
              let startDate = "";
              let endDate = "";
              obj.appointment_details!.forEach((obj1) => {
                this.pastSessionsModel!.appointmentId = obj1.id;
                startDate = obj.appointment_date + " " + obj1.from;
                endDate = obj.appointment_date + " " + obj1.to;
              });
              this.pastSessionsModel.startAppointmentDate =
                this.componentsService.isrealToOtherContryDate(startDate);

              this.pastSessionsModel.endAppointmentDate =
                this.componentsService.isrealToOtherContryDate(endDate);

              this.pastSessionsModel.appointment_date =
                this.componentsService.isrealToOtherContryDate(
                  obj.appointment_date
                );
              this.pastSessionsModelList.push(this.pastSessionsModel);
            });
          } else {
            this.Loader = false;
          }
          this.Loader = false;
        } catch (error) {
          this.Loader = false;
        }
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  newPagePast(page1: any) {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      page: page1,
    };
    this.componentsService
      .pastAppointmentForUser(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.pastSessionsModelData = response.response;
          this.pastSessionsModelList = [];
          this.totalItems = response.total_records;
          this.pastSessionsModelData.forEach((obj) => {
            this.pastSessionsModel = obj;

            let startDate = "";
            let endDate = "";
            obj.appointment_details!.forEach((obj1) => {
              this.pastSessionsModel!.appointmentId = obj1.id;
              startDate = obj.appointment_date + " " + obj1.from;
              endDate = obj.appointment_date + " " + obj1.to;
            });
            this.pastSessionsModel.startAppointmentDate =
              this.componentsService.isrealToOtherContryDate(startDate);
            this.pastSessionsModel.endAppointmentDate =
              this.componentsService.isrealToOtherContryDate(endDate);
            this.pastSessionsModel.appointment_date =
              this.componentsService.isrealToOtherContryDate(
                obj.appointment_date
              );
            this.pastSessionsModelList.push(this.pastSessionsModel);
          });
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        } else {
        }
        this.Loader = false;
      },error=>{
        this.Loader = false;
      });
  }

  newPageUpcoming(page1: any) {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      page: 1,
    };
    this.componentsService
      .upcommingAppointmentForUser(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.sessionsModelData = response.response;
          this.sessionsModelList = [];
          this.totalItems = response.total_recordss;
          this.sessionsModelData.forEach((obj) => {
            this.sessionsModel = obj;
            let startDate = "";
            let endDate = "";
            obj.appointment_details!.forEach((obj1) => {
              this.sessionsModel!.appointmentId = obj1.id;
              startDate = obj.appointment_date + " " + obj1.from;
              endDate = obj.appointment_date + " " + obj1.to;
            });
            this.sessionsModel.startAppointmentDate =
              this.componentsService.isrealToOtherContryDate(startDate);
            this.sessionsModel.endAppointmentDate =
              this.componentsService.isrealToOtherContryDate(endDate);
            this.sessionsModel.appointment_date =
              this.componentsService.isrealToOtherContryDate(
                obj.appointment_date
              );
            this.sessionsModelList.push(this.sessionsModel);
          });
        } else {
        }
        this.Loader = false;
      },error=>{
        this.Loader = false;
      });
  }

  sessionDetail(appointmentId: any) {
    var id = this.componentsService.encrypt(appointmentId);
    if (appointmentId != null) {
      this.router.navigate(["/i-fal-menu/session-detail"], {
        queryParams: { id: id },
      });
    }
  }
}
