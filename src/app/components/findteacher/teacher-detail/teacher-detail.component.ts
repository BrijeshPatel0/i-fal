import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { format } from "date-fns";
import * as $ from "jquery";
import { ComponentsService } from "../../components.service";
import {
  SingleTeacherDetailsModel,
  TeacherRatingsModel,
  TeacherSlotModel,
} from "../teacher-modal";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import {
  dataModel,
  NotesModel,
  ProfileModel,
  SessionsModel,
} from "../../teacher.modal";
import * as moment from "moment";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-teacher-detail",
  templateUrl: "./teacher-detail.component.html",
  styleUrls: ["./teacher-detail.component.css"],
  // encapsulation:ViewEncapsulation.None
})
export class TeacherDetailComponent implements OnInit {
  teacherID: any;
  teacherBirthYear: number = 0;
  singleTeacherDetailsModel!: SingleTeacherDetailsModel;
  teacherRatingsModel: any;
  page: number = 0;
  itemsPerPage: number = 21;
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
  isSuccess: boolean = false;
  isDisabled: boolean = true;
  styleExp: any = "none";
  styleExpConfirm: any = "none";
  futureDate: any;
  newAppointmentId: any;
  Loader: boolean = true;
  googleCalendar: any;
  endAppointmentDate: any;
  appointmentFormatDate: any;
  startAppointmentDate: any;
  appointmentCount: any;
  currentTime: number = 0;
  language: any;
  sessionsModelData: SessionsModel[] = [];
  sessionsModelList: SessionsModel[] = [];
  sessionsModel: SessionsModel | undefined;
  public directionController = new TextDirectionController();
  @ViewChild("videoPlayer") videoplayer: any;
  @ViewChild("videoPlayer1") videoplayer1: any;
  @ViewChild("videoPlayer2") videoplayer2: any;
  public startedPlay: boolean = false;
  public show: boolean = false;
  stylePreference: any = "none";
  isDontShow: boolean = false;
  notesForm!: FormGroup;
  notesModel: NotesModel = new NotesModel();
  sesssionSettings: any;
  profileModel!: ProfileModel;
  stylebusiness: any = "none";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.singleTeacherDetailsModel = new SingleTeacherDetailsModel();
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    this.appointmentCount = localStorage.getItem("appointment_count");
    this.upcommingAppointmentForUser();
    this.isDontShow = false;
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

  ngOnInit() {
    this.notesForm = this.formBuilder.group({
      notes1: [this.notesModel.notes1],
      notes2: [this.notesModel.notes2],
      notes3: [this.notesModel.notes3],
      notes4: [this.notesModel.notes4],
      notes5: [this.notesModel.notes5],
    });
    this.getSessionSettings();
    this.language = localStorage.getItem("language");
    $("video").addClass("responsive-iframe");
    $(".TeacherMN").addClass("active");
    const current = new Date();
    current.setMinutes(current.getMinutes() + 15);
    this.currentTime = current.getTime();
    $("body").removeClass("body");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.teacherID = params["id"];
      this.teacherID = Number(this.componentsService.decrypt(this.teacherID));
    });
    this.getSingleTeacherDetails();
    this.getTeacherRatings();
    this.Last30Days(0);
    this.styleExp = "none";
    this.styleExpConfirm = "none";
  }
  play(event: any) {
    // console.log(event);
  }

  sessionDetail() {
    var id = this.componentsService.encrypt(this.newAppointmentId);
    this.router.navigate(["/i-fal-menu/session-detail"], {
      queryParams: { id: id },
    });

    $("body").removeAttr("style");
    // $('body').removeClass('modal-open');
    // $('body').addClass('body');
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
  }
  session() {
    this.ngOnInit();
    // this.router.navigate(["/i-fal-menu/booklession"]);
    $("body").removeAttr("style");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
  }
  getSingleTeacherDetails() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      teacherId: this.teacherID,
    };
    this.componentsService
      .getSingleTeacherDetails(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.singleTeacherDetailsModel = response.response;
          const convertAge = new Date(response.response.birth_date);
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
          var birthDate = new Date(response.response.birth_date);
          var now1 = new Date(response.response.birth_date);
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
        } else {
        }
        this.Loader = false;
      });
    this.changeDetector.detectChanges();
  }

  getTeacherRatings() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      teacherId: this.teacherID,
      page: 1,
    };
    this.componentsService.getTeacherRatings(commonData).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.teacherRatingsModel = [];
          this.totalItems = response.total_records;
          var data = response.response.forEach((obj: any) => {
            obj.newRating = (Number(obj.rating) * 90) / 5;
            let date = new Date(obj.created_at_two);
            // obj.newDate = format(date,'dd MMM, yyyy')
            obj.newDate = new Date(obj.created_at_two);

            this.teacherRatingsModel.push(obj);
          });
          // console.log(this.teacherRatingsModel);
        } else {
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }

  gty(page1: any) {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      teacherId: this.teacherID,
      page: page1,
    };
    this.componentsService
      .getTeacherRatings(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.page = page1;
          this.teacherRatingsModel = [];
          var data = response.response.forEach((obj: any) => {
            obj.newRating = (Number(obj.rating) * 90) / 5;
            let date = new Date(obj.created_at_two);
            // obj.newDate = format(date,'dd MMM, yyyy')
            obj.newDate = new Date(obj.created_at_two);
            this.teacherRatingsModel.push(obj);
          });
        } else {
        }
        this.Loader = false;
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
    const newDate = format(toDayDate, "yyyy-MM-dd");
    this.selectdate = format(toDayDate, "EEEE d MMM yyyy");
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
    $(".drag-scroll-content ").addClass("test");
    // this.Loader=false
  }
  bookSession(teacherId: any) {
    this.Loader = true;
    $("body").removeAttr("style");
    $("body").removeClass("modal-open");
    $("body").addClass("body");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
    $(".drag-scroll-content").css("overflow", "hidden");
    const toDayDate = new Date();
    // const newDate = format(toDayDate, "yyyy-MM-dd");
    const newDate = moment(toDayDate).format("YYYY-MM-DD");
    this.getTeacherslote(newDate);
    this.styleExp = "block";
    this.Last30Days(0);
    // this.Loader=false;s
  }
  getTeacherslote(SelectDate?: any) {
    this.Loader = true;
    this.teacherSlotFilter = null;
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
          this.teacherSlotModel.forEach((obj: any) => {
            this.teacherAllSlot = new TeacherSlotModel();
            this.teacherAllSlot.id = obj.id;
            this.teacherAllSlot.end = obj.end;
            this.teacherAllSlot.start = obj.start;
            this.teacherAllSlot.isBooked = obj.isBooked;
            this.teacherAllSlot.start_date =
              this.componentsService.isrealToOtherContryDate1(obj.start_date);
            this.teacherAllSlot.newDate =
              this.componentsService.isrealToOtherContryNewDate1(
                obj.start_date
              );
            var timeStamp = this.componentsService.isrealToOtherContryTime1(
              obj.start_date
            );
            this.teacherAllSlot.startTimeNumber = timeStamp.getTime();

            var isBrack = false;
            var i = 0;
            for (i = 0; i < this.breakDataModel!.length; i++) {
              if (
                new Date(
                  this.componentsService.isrealToOtherContryDate1(
                    obj.start_date
                  )
                ).getTime() >=
                  new Date(
                    this.componentsService.isrealToOtherContryDate1(
                      this.breakDataModel![i].break_start_time
                    )
                  ).getTime() &&
                new Date(
                  this.componentsService.isrealToOtherContryDate1(
                    obj.start_date
                  )
                ).getTime() <
                  new Date(
                    this.componentsService.isrealToOtherContryDate1(
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
        // console.log(this.teacherAllSlotModel,"checkDate");

        this.Loader = false;
      });
    $(".drag-scroll-content").css("overflow", "hidden");
  }

  applyFilter(date: any) {
    this.teacherSlotFilter = this.teacherAllSlotModel.filter(
      (item) => item.newDate == date
    );
    // this.teacherSlotFilter.sort();
    this.teacherSlotFilter.sort((a: any, b: any) =>
      a.start_date.localeCompare(b.start_date)
    );
    // console.log(this.teacherSlotFilter);

    // this.teacherSlotFilter.sort((a:any, b:any) => a.localeCompare(b));
  }
  selectSlot(appData: any) {
    this.selectdat = appData.start_date;
    var minutesToAdd = 25;
    var currentDate = new Date(this.selectdat);
    this.futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    this.selectdateTime = this.componentsService.otherContryDateToIsrealDate1(
      appData.start_date
    );
    const DateTime = this.selectdateTime.split(" ");
    this.sloteDate = DateTime[0];
    this.sloteTime = DateTime[1];
    this.googleCalendarLink();
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
  bookAppointment() {
    this.isDisabled = true;
    this.Loader = true;
    $("body").removeAttr("style");
    $("body").removeClass("modal-open");
    $("body").addClass("body");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();

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
        // this.isSuccess = true;
        this.styleExp = "none";
        // this.styleExpConfirm = "block";
        if (localStorage.getItem("isDontShow") == "true") {
          this.styleExpConfirm = "block";
        } else {
          this.stylePreference = "block";
        }
        this.newAppointmentId = response.response.id;
        this.googleCalendarLink();
      } else if (response.success === 7) {
        this.router.navigate(["/i-fal-menu/member"]);
      } else {
        this.styleExp = "block";
        this.snackBar.open(response.message, "", {
          panelClass: ["error", this.directionController.textDirection],
          direction: this.directionController.textDirection,
        });
      }
      this.Loader = false;
      this.isDisabled = true;
    });
  }
  closePopup() {
    this.styleExp = "none";
    this.stylebusiness = "none";
    // this.ngOnInit();
  }
  closePopupThank() {
    this.styleExpConfirm = "none";
    this.ngOnInit();
  }
  googleCalendarLink() {
    let endAppointmentDate = format(this.futureDate, "yyyy-MM-dd HH:mm:ss");
    // let endAppointmentDate = moment(this.futureDate).format("YYYY-MM-DD HH:mm");
    var SAD = this.selectdat
      .replace(/\s/g, "")
      .replace(":", "")
      .replace(":", "")
      .replace("-", "")
      .replace("-", "");
    var EAD = endAppointmentDate
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
      this.singleTeacherDetailsModel?.first_name +
      "+" +
      this.singleTeacherDetailsModel?.last_name +
      "&dates=" +
      startDateTime +
      "/" +
      endDateTime;
    this.googleCalendar = url;
    // console.log(url);
  }
  starWidth: number = 0;

  rateProduct(rateValue: number) {
    this.starWidth = (rateValue * 90) / 5;
  }
  openCityInNewWindow() {
    this.router.navigate(["/i-fal-menu/sessions"]);
    window.open(this.googleCalendar, "_blank");
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
        if (response.success === 1) {
          this.sessionsModelData = response.response;
          this.sessionsModelList = [];
          this.totalItems = response.total_records;
          this.sessionsModelData.forEach((obj) => {
            this.sessionsModel = obj;
            let startDate = "";
            let endDate = "";
            let sloat_id = "";
            obj.appointment_details!.forEach((obj1) => {
              this.sessionsModel!.appointmentId = obj1.id;
              startDate = obj.appointment_date + " " + obj1.from;
              endDate = obj.appointment_date + " " + obj1.to;
              sloat_id = obj1.sloat_id + "";
            });
            this.sessionsModel.sloat_id = sloat_id;
            this.sessionsModel.startAppointmentDate =
              this.componentsService.isrealToOtherContryDate1(startDate);
            this.sessionsModel.endAppointmentDate =
              this.componentsService.isrealToOtherContryDate1(endDate);
            this.sessionsModel.appointment_date =
              this.componentsService.isrealToOtherContryDate1(
                obj.appointment_date
              );
            this.sessionsModelList.push(this.sessionsModel);
            // this.sessionsModelList[0].sloat_id
          });
        } else {
        }
        this.Loader = false;
        // this.Last30Days(0);
      });
  }

  pauseVideo(videoplayer: any) {
    videoplayer.nativeElement.play();
    // this.startedPlay = true;
    // if(this.startedPlay == true)
    // {
    setTimeout(() => {
      videoplayer.nativeElement.pause();
    }, 1000);
    // }
  }
  pauseVideo1(videoplayer1: any) {
    videoplayer1.nativeElement.play();
    // this.startedPlay = true;
    // if(this.startedPlay == true)
    // {
    setTimeout(() => {
      videoplayer1.nativeElement.pause();
    }, 1500);
    // }
  }
  pauseVideo2(videoplayer2: any) {
    videoplayer2.nativeElement.play();
    // this.startedPlay = true;
    // if(this.startedPlay == true)
    // {
    setTimeout(() => {
      videoplayer2.nativeElement.pause();
    }, 2000);
    // }
  }
  updateSessionSettingsNext() {
    this.updateSessionSettings();
    // this.styleExpConfirm = 'block';
  }
  updateSessionSettings() {
    debugger
    localStorage.setItem("isDontShow", this.isDontShow.toString());
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

          localStorage.setItem("getProfile", JSON.stringify(response.response));
          if(this.stylePreference != "block"){
            this.snackBar.open(response.message, "", {
              panelClass: ["success", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
          }
          this.stylePreference = "none";
          // this.getSessionSettings();
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
  getSessionSettings() {
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
  businessEnglish(event: any) {
    this.stylebusiness = "block";
  }
}
