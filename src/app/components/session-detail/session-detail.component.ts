import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { isThisISOWeek } from "date-fns";
import format from "date-fns/format";
import * as moment from "moment";
import { interval, Subscription } from "rxjs";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import {
  SingleTeacherDetailsModel,
  TeacherSlotModel,
} from "../findteacher/teacher-modal";
import {
  dataModel,
  NotesModel,
  ProfileModel,
  SessionsModel,
  UserAppointmentDetailsModel,
} from "../teacher.modal";

@Component({
  selector: "app-session-detail",
  templateUrl: "./session-detail.component.html",
  styleUrls: ["./session-detail.component.css"],
})
export class SessionDetailComponent implements OnInit {
  appointmentId: number = 0;
  appointmentStatus: any = "";
  userAppointmentDetailsModel: any;
  teacherBirthYear: number = 0;
  zoomJoinURL: any;
  appointmentDate: any;
  teacherID: any;
  singleTeacherDetailsModel: SingleTeacherDetailsModel | undefined;
  teacherRatingsModel: any;
  page: number = 0;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  result: any = [];
  selectdate: any;
  r: number = 30;
  teacherSlotModel: TeacherSlotModel[] = [];
  teacherAllSlotModel: TeacherSlotModel[] = [];
  breakDataModel: dataModel[] | undefined;
  teacherSlotFilter: any;
  teacherAllSlot: TeacherSlotModel | undefined;
  selectdat: any;
  selectdateTime: any;
  sloteDate: any;
  sloteTime: any;
  sloatId: any;
  OldSloatId: any;
  isSuccess: boolean = false;
  isDisabled: boolean = true;
  appointmentDetails: any;
  styleExp: any = "none";
  styleExpConfirm: any = "none";
  isAppointment: boolean = false;
  actionSession: any;
  appointmentFormatDate: any;
  startTime: any;
  futureDate: any;
  newAppointmentId: any;
  startAppointmentDate: any;
  endAppointmentDate: any;
  Loader: boolean = true;
  styleExpAccess: any = "none";
  styleExpCancel: any = "none";
  stylebusiness: any = "none";
  stylePreference: any = "none";
  googleCalendar: any;
  appointmentCount: any;
  isReschedule: boolean = false;
  currentTime: number = 0;
  sessionsModelData: SessionsModel[] = [];
  sessionsModelList: SessionsModel[] = [];
  sessionsModel: SessionsModel | undefined;
  pastSessionsModelData: SessionsModel[] = [];
  pastSessionsModelList: SessionsModel[] = [];
  pastSessionsModel: SessionsModel | undefined;
  isZoom: boolean = true;
  isDontShow: boolean = true;
  public directionController = new TextDirectionController();
  subscription!: Subscription;
  panelOpenState = true;
  student_comment: any;
  step = 0;
  notesForm!: FormGroup;
  sesssionSettings: any;
  profileModel!: ProfileModel;
  notesModel: NotesModel = new NotesModel();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    // this.getProfile();
    if(localStorage.getItem('isDontShow') == 'true'){
      this.isDontShow = true;
    }else{
      this.isDontShow = false;
    }

  }
  ngOnInit() {
    this.appointmentCount = localStorage.getItem("appointment_count");
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    this.upcommingAppointmentForUser();
    // $(".teachertab .test")
    // .addClass("active")
    // .siblings()
    // .removeClass("active");
    $(".SessionsMN").addClass("active");
    const current = new Date();
    current.setMinutes(current.getMinutes() + 15);
    this.currentTime = current.getTime();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.appointmentId = params["id"];
      this.appointmentId = Number(
        this.componentsService.decrypt(this.appointmentId)
      );
      // this.appointmentStatus = params["statusType"] ? params["statusType"] : "";
    });
    this.notesForm = this.formBuilder.group({
      notes1: [this.notesModel.notes1],
      notes2: [this.notesModel.notes2],
      notes3: [this.notesModel.notes3],
      notes4: [this.notesModel.notes4],
      notes5: [this.notesModel.notes5],
    });
    this.getSessionSettings();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // isrealToOtherContryDate(isrealDate: any) {

  //   const OtherDate = format(
  //     new Date(new Date(isrealDate + " GMT+0300").toUTCString()),
  //     "yyyy-MM-dd HH:mm:ss"
  //   );
  //   return OtherDate;
  // }
  // isrealToOtherContryTime(isrealDate: any) {
  //   const OtherDate = new Date(
  //     new Date(isrealDate + " GMT+0300").toUTCString()
  //   );
  //   return OtherDate;
  // }
  // isrealToOtherContryNewDate(isrealDate: any) {
  //   const OtherDate = format(
  //     new Date(new Date(isrealDate + " GMT+0300").toUTCString()),
  //     "yyyy-MM-dd"
  //   );
  //   return OtherDate;
  // }
  // otherContryDateToIsrealDate(otherContryDate: string) {
  //   const isrealDate = new Date(otherContryDate).toLocaleString("sv-SE", {
  //     timeZone: "asia/Jerusalem",
  //   });

  //   return isrealDate;
  // }
  getSingleAppointmentDetails() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      appointmentId: this.appointmentId,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };

    this.componentsService
      .getSingleAppointmentDetails(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.userAppointmentDetailsModel = response.response;
          this.appointmentStatus = response.response.appointment_status;
          const convertAge = new Date(
            response.response.teacher_data.birth_date
          );
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.teacherBirthYear = Math.floor(
            timeDiff / (1000 * 3600 * 24) / 365
          );

          var today = new Date();
          var now = new Date();
          var start = new Date(now.getFullYear(), 0, 0);
          var diff = Number(now) - Number(start);
          var oneDay = 1000 * 60 * 60 * 24;
          var day = Math.floor(diff / oneDay);
          var birthDate = new Date(response.response.teacher_data.birth_date);
          var now1 = new Date(response.response.teacher_data.birth_date);
          var start1 = new Date(now1.getFullYear(), 0, 0);
          var diff1 = Number(now1) - Number(start1);
          var oneDay1 = 1000 * 60 * 60 * 24;
          var day1 = Math.floor(diff1 / oneDay1);

          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          this.teacherBirthYear = age;
          if (day < day1) {
            this.teacherBirthYear = --age;
          }

          this.zoomJoinURL = response.response.zoom_join_url;
          // response.response.appointment_date;
          this.OldSloatId = response.response.appointment_details[0].sloat_id;
          this.teacherID = response.response.teacher_id;
          this.student_comment = response.response.student_comment;
          this.appointmentDate = response.response.appointment_date;
          let date = new Date(response.response.appointment_date);
          this.appointmentFormatDate = format(date, "EEEE d MMM yyyy");
          this.startAppointmentDate =
            this.componentsService.isrealToOtherContryDate(
              response.response.appointment_date +
                " " +
                response.response.appointment_details[0].from
            );
          this.endAppointmentDate =
            this.componentsService.isrealToOtherContryDate(
              response.response.appointment_date +
                " " +
                response.response.appointment_details[0].to
            );
          this.googleCalendarLink(response.response.teacher_data);
          // this.Loader=false;
          // this.isSuccess= true;
          // this.styleExp="block";
          // this.appointmentId=response.response.id;
          // });
          // $("button").on("click", function(){

          // });
          // this.router.navigate(["/i-fal-menu/booklession"]);
          // this.startAppointmentDate = "Sat Jan 24 2023 21:30:00"

          // var now = new Date(Date.now() - (5 * 60 * 1000));
          const source = interval(1000);
          this.subscription = source.subscribe((val) => {
            var twentyMinutesLater = new Date();
            var now = new Date(
              twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 5)
            );
            if (now.getTime() > new Date(this.startAppointmentDate).getTime()) {
              this.isZoom = false;
            }
          });
        } else {
          // this.styleExp="none";
          // this.router.navigate(["/i-fal-menu"]);
          // this.Loader=false;
        }
        setTimeout(() => {
          this.Loader = false;
        }, 1000);
      });
  }
  Last30Days(j: number) {
    this.result = [];
    const k = this.r + j;
    for (var i = 0; i < k; i++) {
      // var d = new Date();
      // // this.selectdate = format(d, "EEEE d MMM");
      // d.setDate(d.getDate() + i);
      // this.result.push(format(d, "EEEE d MMM yyyy"));
      // format(d, "EEEE d MMM");

      var d = new Date();
      d.setDate(d.getDate() + i);
      var isAllready = 0;

      var date = format(d, "EEEE d MMM yyyy");

      var keepGoing = true;

      this.sessionsModelList.forEach((obj) => {
        var k = obj.startAppointmentDate;

        var y = new Date(k!);
        if (keepGoing) {
          if (format(d, "yyyy-MM-dd") == format(y, "yyyy-MM-dd")) {
            isAllready = 1;
            date = format(d, "EEEE d MMM yyyy");
            keepGoing = false;
          } else {
            isAllready = 0;
            date = format(d, "EEEE d MMM yyyy");
          }
        }
      });
      this.result.push({ date: date, isAllready: isAllready });
      format(d, "EEEE d MMM");
    }
    this.r = this.result.length;
    const toDayDate = new Date();
    this.selectdate = format(toDayDate, "EEEE d MMM yyyy");
    const newDate = format(toDayDate, "yyyy-MM-dd");
    // this.getTeacherslote(newDate);
    // this.applyFilter(newDate);
  }
  selectDate(date: any) {
    this.Loader = true;
    this.isDisabled = true;
    this.selectdate = date;
    this.selectdat = null;
    this.sloteTime = null;
    // $(".nav-link").removeClass("active");
    const toDayDate = new Date(date);
    const newDate = format(toDayDate, "yyyy-MM-dd");
    this.getTeacherslote(newDate);
    // this.applyFilter(newDate);
  }
  bookSession(teacherId: any, actionSession: any) {
    this.getSessionSettings();
    $(".drag-scroll-content").css("overflow", "hidden");
    this.actionSession = actionSession;
    const toDayDate = new Date();
    const newDate = format(toDayDate, "yyyy-MM-dd");
    if (this.actionSession == "resheduleSession") {
      this.getTeacherslote(newDate);
      this.selectdate = this.appointmentDate;
    } else {
      this.getTeacherslote(newDate);
    }
    this.Last30Days(0);
    this.styleExp = "block";
  }
  getTeacherslote(SelectDate?: any) {
    this.teacherSlotFilter = null;
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      teacherId: this.teacherID,
      date: SelectDate,
    };
    this.componentsService
      .getTeacherslote(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.teacherAllSlotModel = [];
          this.teacherSlotModel = response.response;
          this.breakDataModel = response.data;
          this.teacherSlotModel.forEach((obj) => {
            this.teacherAllSlot = new TeacherSlotModel();
            this.teacherAllSlot.id = obj.id;
            this.teacherAllSlot.end = obj.end;
            this.teacherAllSlot.start = obj.start;
            if (obj.id == this.OldSloatId) {
              this.teacherAllSlot.isBooked = false;
            } else {
              this.teacherAllSlot.isBooked = obj.isBooked;
            }
            this.teacherAllSlot.start_date =
              this.componentsService.isrealToOtherContryDate(obj.start_date);
            this.teacherAllSlot.newDate =
              this.componentsService.isrealToOtherContryNewDate(obj.start_date);
            var timeStamp = this.componentsService.isrealToOtherContryTime(
              obj.start_date
            );
            this.teacherAllSlot.startTimeNumber = timeStamp.getTime();
            var isBrack = false;
            var i = 0;
            for (i = 0; i < this.breakDataModel!.length; i++) {
              if (
                new Date(
                  this.componentsService.isrealToOtherContryDate(obj.start_date)
                ).getTime() >=
                  new Date(
                    this.componentsService.isrealToOtherContryDate(
                      this.breakDataModel![i].break_start_time
                    )
                  ).getTime() &&
                new Date(
                  this.componentsService.isrealToOtherContryDate(obj.start_date)
                ).getTime() <
                  new Date(
                    this.componentsService.isrealToOtherContryDate(
                      this.breakDataModel![i].break_end_time
                    )
                  ).getTime()
              ) {
                isBrack = true;
                break;
              }
            }
            if (!isBrack) {
              var keepGoing = true;
              this.sessionsModelList.forEach((obj) => {
                if (keepGoing) {
                  if (
                    this.teacherAllSlot?.start_date == obj.startAppointmentDate
                  ) {
                    this.teacherAllSlot!.isAlready = 1;
                    keepGoing = false;
                  } else {
                    this.teacherAllSlot!.isAlready = 0;
                  }
                }
              });
              this.teacherAllSlotModel.push(this.teacherAllSlot);
            }
          });
          this.applyFilter(SelectDate);
        } else {
        }
        this.Loader = false;
      });
  }

  applyFilter(date: any) {
    this.teacherSlotFilter = this.teacherAllSlotModel.filter(
      (item) => item.newDate == date
    );
    // this.teacherSlotFilter.sort((a:any, b:any) => a.localeCompare(b));
    // this.teacherSlotFilter.sort();
    this.teacherSlotFilter.sort((a: any, b: any) =>
      a.start_date.localeCompare(b.start_date)
    );
  }
  selectSlot(appData: any) {
    this.selectdat = appData.start_date;
    var minutesToAdd = 25;
    var currentDate = new Date(this.selectdat);
    this.futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

    this.selectdateTime = this.componentsService.otherContryDateToIsrealDate(
      appData.start_date
    );
    const DateTime = this.selectdateTime.split(" ");
    this.sloteDate = DateTime[0];
    this.sloteTime = DateTime[1];
    this.startTime = DateTime[1];

    this.sloatId = appData.id;
    if (
      this.teacherID != null &&
      this.sloteDate != null &&
      this.sloteTime != null &&
      this.sloatId != null
    ) {
      this.isDisabled = false;
    }
  }

  appointment() {}

  bookAppointment() {
    // $(".modal-backdrop ").removeClass("fade");
    // $(".modal-backdrop ").removeClass("show");
    // $(".modal-backdrop").remove();
    this.Loader = true;
    this.isDisabled = true;
    const toDayDate = new Date();
    const newDate = format(toDayDate, "yyyy-MM-dd");
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    if (this.sloteTime == null) {
      this.Loader = false;
      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Please select at least one time slot", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("אנא בחר משבצת זמן אחת", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      return;
    }
    if (this.teacherID == null || this.teacherID == 0) {
      this.Loader = false;

      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Please select teacher", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("אנא בחר מורה", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      return;
    }
    const data = {
      date: this.sloteDate,
      sloatId: this.sloatId,
      startTime: this.sloteTime,
      teacherId: this.teacherID,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService.bookAppointment(data).subscribe((response: any) => {
      if (response.success === 1) {
        this.isSuccess = true;
        this.styleExp = "none";
        // this.styleExpConfirm = "block";
     
        if(localStorage.getItem('isDontShow') == 'true'){
          this.styleExpConfirm = "block";
        }else{
          this.stylePreference = "block";
        }
        this.newAppointmentId = response.response.id;
        // this.googleCalendarLink();
      } else if (response.success === 7) {
        this.router.navigate(["/i-fal-menu/member"]);
      } else {
        this.styleExp = "block";
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      this.isDisabled = true;
      this.Loader = false;
    });
  }

  rescheduleAppointment() {
    // $(".modal-backdrop ").removeClass("fade");
    // $(".modal-backdrop ").removeClass("show");
    // $(".modal-backdrop").remove();
    this.Loader = true;
    this.isDisabled = true;
    const toDayDate = new Date();
    const newDate = format(toDayDate, "yyyy-MM-dd");
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    if (this.sloteTime == null) {
      this.Loader = false;
      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Please select at least one time slot", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("אנא בחר משבצת זמן אחת", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      return;
    }
    if (this.teacherID == null || this.teacherID == 0) {
      this.Loader = false;
      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Please select teacher", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("אנא בחר מורה", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      return;
    }
    const data = {
      newDate: this.sloteDate,
      newSloatId: this.sloatId,
      startTime: this.sloteTime,
      teacherId: this.teacherID,
      appointmentId: this.appointmentId,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService
      .rescheduleAppointment(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.isSuccess = true;
          this.isReschedule = true;
          this.styleExp = "none";
          // this.styleExpConfirm = "block";
          // this.stylePreference = "block";
          if(localStorage.getItem('isDontShow') == 'true'){
            this.styleExpConfirm = "block";
          }else{
            this.stylePreference = "block";
          }
        } else {
          this.styleExp = "block";
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.isDisabled = true;
        this.Loader = false;
      });
  }
  sessionDetail() {
    // this.router.navigate(["/i-fal-menu/session-detail"]);
    if (this.actionSession == "resheduleSession") {
      this.styleExpConfirm = "none";
      this.ngOnInit();
    } else {
      var id = this.componentsService.encrypt(this.newAppointmentId);
      this.router.navigate(["/i-fal-menu/session-detail"], {
        queryParams: { id: id },
      });
      this.styleExpConfirm = "none";
      this.ngOnInit();
    }

    $("body").removeAttr("style");
    // $('body').removeClass('modal-open');
    // $('body').addClass('body');
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
    this.isReschedule = false;
  }
  session() {
    this.styleExpConfirm = "none";
    this.ngOnInit();
    // this.router.navigate(["/i-fal-menu/booklession"]);
    $("body").removeAttr("style");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
  }
  cancelAppointment() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      appointmentId: this.appointmentId,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService.cancelAppointment(data).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.isSuccess = true;
          this.router.navigate(["/i-fal-menu/sessions"]);
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
          // this.router.navigate(["/i-fal-menu"]);
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  sessionReport() {
    // this.router.navigate(["/i-fal-menu/session-report"]);
    var id = this.componentsService.encrypt(this.appointmentId);
    this.router.navigate(["/i-fal-menu/session-report"], {
      queryParams: { id: id },
    });
  }
  closePopup() {
    this.styleExp = "none";
    this.stylebusiness = "none";
  }
  closePopupThank() {
    this.styleExpConfirm = "none";
    this.isReschedule = false;
    this.ngOnInit();
  }
  accessLessonPopup() {
    this.styleExpAccess = "block";
  }
  closeAccessLessonPopup() {
    this.styleExpAccess = "none";
  }
  cancelSession() {
    this.styleExpCancel = "block";
  }
  closeCancelSession() {
    this.styleExpCancel = "none";
  }
  googleCalendarLink(TeacherData: any) {
    this.startAppointmentDate;
    this.endAppointmentDate;
    var s = format(new Date(this.startAppointmentDate), "yyyy-MM-dd HH:mm:ss");
    var e = format(new Date(this.endAppointmentDate), "yyyy-MM-dd HH:mm:ss");
    var SAD = s
      .replace(/\s/g, "")
      .replace(":", "")
      .replace(":", "")
      .replace("-", "")
      .replace("-", "");
    var EAD = e
      .replace(/\s/g, "")
      .replace(":", "")
      .replace(":", "")
      .replace("-", "")
      .replace("-", "");
    var b = "T";
    var position = 8;
    var startDateTime = [SAD.slice(0, position), b, SAD.slice(position)].join(
      ""
    );
    var endDateTime = [EAD.slice(0, position), b, EAD.slice(position)].join("");
    let url =
      "https://calendar.google.com/calendar/r/eventedit?text=Session+with+" +
      TeacherData.first_name +
      "+" +
      TeacherData.last_name +
      "&dates=" +
      startDateTime +
      "/" +
      endDateTime;
    this.googleCalendar = url;
    //  this.Loader=false;
  }

  upcommingAppointmentForUser() {
    this.page = 0;
    // this.Loader=true;
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
            this.sessionsModel.appointment_date =
              this.componentsService.isrealToOtherContryDate(
                obj.appointment_date
              );
            this.sessionsModelList.push(this.sessionsModel);
          });
        } else {
        }
        setTimeout(() => {
          this.Loader = false;
        }, 1000);
        //
        this.getSingleAppointmentDetails();
        this.Last30Days(0);
      });
  }

  openCityInNewWindow() {
    this.router.navigate(["/i-fal-menu/sessions"]);
    window.open(this.googleCalendar, "_blank");
  }
  openCityInNewWindowDetail() {
    // this.router.navigate(["/i-fal-menu/sessions"]);
    window.open(this.googleCalendar, "_blank");
  }
  addComment() {
    this.Loader = true;
    if (this.student_comment == "") {
      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Please write comment", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("בבקשה כתוב הערה/בקשה", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      this.Loader = false;
      return;
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      appointmentId: this.appointmentId,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      comment: this.student_comment,
    };
    this.componentsService.addComment(data).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.isSuccess = true;
          // this.router.navigate(["/i-fal-menu/sessions"]);
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
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  updateSessionSettings() {
    this.isDontShow 
    localStorage.setItem('isDontShow',this.isDontShow.toString());
    console.log(this.notesForm.value);
    this.Loader = true;
    if (
      this.notesForm.value.notes1 == false &&
      this.notesForm.value.notes2 == false &&
      this.notesForm.value.notes3 == false &&
      this.notesForm.value.notes4 == false 
    ) {
      if (this.directionController.textDirection == "ltr") {
        this.snackBar.open("Select at least one option", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      } else {
        this.snackBar.open("בחר/י לפחות אפשרות אחת", "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      this.Loader = false;
      return;
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    var t = [];
    if (this.notesForm.value.notes1) {
      t.push("1");
    }
    if (this.notesForm.value.notes2) {
      t.push("2");
    }
    if (this.notesForm.value.notes3) {
      t.push("3");
    }
    if (this.notesForm.value.notes4) {
      t.push("4");
    }
    if (this.notesForm.value.notes5 != "") {
      t.push(this.notesForm.value.notes5);
    }
    this.sesssionSettings = t.toString();
    console.log(this.sesssionSettings);
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      sesssionSettings: this.sesssionSettings,
    };
    this.componentsService.updateSessionSettings(data).subscribe(
      (response: any) => {
        if (response.success === 1) {
          if (this.stylePreference == "block") {
            this.styleExpConfirm = "block";
          }
debugger
          localStorage.setItem("getProfile", JSON.stringify(response.response));
          if(this.stylePreference != "block"){
            this.snackBar.open(response.message, "", {
              panelClass: ["success", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
          }
          this.stylePreference = "none";
       
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  checkValue(check: any) {
    if(this.notesForm.value.notes2 && this.notesForm.value.notes1){
      if (check == 1) {

        this.notesForm.patchValue({
          notes1: true,
          notes2: false,
        });
      } else {
        this.notesForm.patchValue({
          notes1: false,
          notes2: true,
        });
      }
    }
  }

  getSessionSettings() {
    debugger
    var profileModel = localStorage.getItem("getProfile");
    this.profileModel = JSON.parse(profileModel!);
    this.sesssionSettings = this.profileModel!.session_settings;
    var myArray = this.sesssionSettings.split(",");
    myArray.forEach((element: any) => {
      if (element == "1") {
        this.notesModel.notes1 = true;
      } else if (element == "2") {
        this.notesModel.notes2 = true;
      } else if (element == "3") {
        this.notesModel.notes3 = true;
      } else if (element == "4") {
        this.notesModel.notes4 = true;
      } else {
        this.notesModel.notes5 = element;
      }
      this.notesForm.patchValue(this.notesModel);
    });
  }
  businessEnglish(event: any) {
    this.stylebusiness = "block";
  }
  updateSessionSettingsNext() {
    this.updateSessionSettings();
    // this.styleExpConfirm = 'block';
  }
}
