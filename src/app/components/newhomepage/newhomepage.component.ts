import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import format from "date-fns/format";
import { OwlOptions, SlidesOutputData } from "ngx-owl-carousel-o";
import { ComponentsService } from "../components.service";
import { dataModel, responseModel, TeacherModel } from "../teacher.modal";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";

@Component({
  selector: "app-newhomepage",
  templateUrl: "./newhomepage.component.html",
  styleUrls: ["./newhomepage.component.css"],
})
export class NewhomepageComponent implements OnInit {
  teacherModel: TeacherModel[] = [];
  teacherModel1: TeacherModel[] = [];
  responseModel: responseModel[] | undefined;
  responseModel1: responseModel[] = [];
  allResponseModel: responseModel[] = [];
  allResponseModel1: responseModel[] = [];
  breakResponseModel: responseModel[] = [];
  responseData: responseModel | undefined;
  responseData1: responseModel | undefined;
  responseSlot: responseModel[] = [];
  findTeacherData: TeacherModel[] = [];
  findTeacherModel: TeacherModel | undefined;
  breakDataModel: dataModel[] | undefined;
  unicresponseSlot: any[] = [];
  unicresponseTeacher!: any[];
  unicresponseSlot1: any[] = [];
  favoriteSeason: string | undefined;
  latesDate: any;
  selectdat: any;
  selectdate: any;
  isActive: boolean = false;
  isShow: boolean = true;
  r: number = 0;
  teacherId: number | undefined;
  result: any = [];
  sloatId: any;
  findTeacher: responseModel[] = [];
  selectdateTime: any;
  sloteDate: any;
  sloteTime: any;
  findSlotDate: any;
  isSuccess: boolean = false;
  isDisabled: boolean = true;
  isDisabledBTN: boolean = true;
  styleExp: any = "none";
  appointmentId: number = 0;
  teacherFirstName: any;
  teacherLastName: any;
  futureDate: any;
  appointmentCount: any = 0;
  Loader: boolean = true;
  googleCalendar: any;
  currentTime: number = 0;
  id: any = "";
  browserLang: any;
  textDirection: any;
  next: any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    public translateService: TranslateService,
    private componentsService: ComponentsService // private icdCodeDialogModal: MatDialog,
  ) {
    // this.componentsService.currentMessage.subscribe(
    //   (message) => (this.directionController.textDirection = message)
    // );
    this.componentsService.currentMessage.subscribe((message: any) => {
      this.directionController.textDirection = message;
      if (this.directionController.textDirection == "rtl") {
        const element = document.getElementsByClassName("example")[0];
        element!.innerHTML = "הבא";
      } else {
        const element1 = document.getElementsByClassName("example")[0];
        element1!.innerHTML = "NEXT";
      }
    });
    this.appointmentCount = localStorage.getItem("appointment_count");
    this.browserLang = navigator.language || navigator.language;
    let currentUrl = this.router.url;
    // console.log(location.origin,location.origin,"origin");

    // var lang = localStorage.getItem("lang");
    // if (currentUrl == "/lp") {
    //   if (lang != null) {
    //     if (lang == "isr") {
    //       this.textDirection = "rtl";
    //       this.translateService.use("isr");
    //       localStorage.setItem("lang", "isr");
    //       environment.language = "IW";
    //     } else {
    //       this.textDirection = "ltr";
    //       this.translateService.use("en");
    //       localStorage.setItem("lang", "en");
    //       environment.language = "EN";
    //     }
    //   } else {
    //     if (this.browserLang == "he") {
    //       this.textDirection = "rtl";
    //       this.translateService.use("isr");
    //       localStorage.setItem("lang", "isr");
    //       environment.language = "IW";
    //     } else {
    //       this.textDirection = "ltr";
    //       this.translateService.use("en");
    //       localStorage.setItem("lang", "en");
    //       environment.language = "EN";
    //     }
    //   }
    // }
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: [
      "<span class=' test'>{{}}</span>",
      "<span class=' example'></span>",
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  activeSlides?: SlidesOutputData;
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    var buttonName = "";
    if (data.startPosition == 2) {
      if (this.directionController.textDirection == "rtl") {
        $(".changeclass").removeClass("firstsession");
        $(".changeclass").addClass("testdemo");
        const element1 = document.getElementsByClassName("example")[0];
        element1!.innerHTML = "בואו נתחיל";
      } else {
        const element = document.getElementsByClassName("example")[0];
        element!.innerHTML = "GET STARTED";
      }
      buttonName = "GET STARTED";
    }
    if (data.startPosition == 3) {
      $(".owl-next").css("display", "none");
      this.isShow = false;
    }
    this.changeDetector.detectChanges();
  }
  test() {}
  startDragging(event: any) {}
  getData(data: SlidesOutputData) {}
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
  // otherContryDateToIsrealDate(otherContryDate: string) {
  //   const isrealDate = new Date(otherContryDate).toLocaleString("sv-SE", {
  //     timeZone: "asia/Jerusalem",
  //   });

  //   return isrealDate;
  // }

  ngOnInit() {
    $(".iconcolor").css("color", "#28aae1 !important");
    // $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".TeacherMN").addClass("active");
    const current = new Date();
    current.setMinutes(current.getMinutes() + 15)
    this.currentTime = current.getTime();
    $(".modal-backdrop").remove();

    this.Last7Days(5);
    const toDayDate = new Date();
    this.selectdate = format(toDayDate, "EEEE d MMM yyyy");

    // if (this.browserLang == "he") {
    //   const element = document.getElementsByClassName("example")[0];
    //   element!.innerHTML = "הבא";
    // } else {
    //   const element1 = document.getElementsByClassName("example")[0];
    //   element1!.innerHTML = "NEXT";
    // }
    var lang = localStorage.getItem("lang");

    // if (lang != null) {
    if (this.directionController.textDirection == "rtl") {
      const element = document.getElementsByClassName("example")[0];
      element!.innerHTML = "הבא";
    } else {
      const element1 = document.getElementsByClassName("example")[0];
      element1!.innerHTML = "NEXT";
    }
    // } else {
    //   if (this.browserLang == "he") {
    //     const element = document.getElementsByClassName("example")[0];
    //     element!.innerHTML = "הבא";
    //   } else {
    //     const element1 = document.getElementsByClassName("example")[0];
    //   element1!.innerHTML = "NEXT";
    //   }
    // }

    this.changeDetector.detectChanges();
  }

  registration() {
    this.router.navigate(["/registration"]);
  }

  bookTheClass(newDate1?: any) {
    this.Loader = true;
    if (newDate1 != null) {
      // this.latesDate = newDate1;
      this.latesDate = format(newDate1, "yyyy-MM-dd");
    } else {
      var toDayDate = new Date();
      this.latesDate = format(toDayDate, "yyyy-MM-dd");
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      // date: "2022-09-29",
      date: this.latesDate,
      language: environment.language,
    };
    // this.responseSlot = [];
    // this.unicresponseSlot = [];
    this.componentsService
      .getAllTeachersSloatsFromCron(data)
      .subscribe((response: any) => {
        $(".drag-scroll-content").css("overflow", "hidden");

        if (response.success === 1) {
          this.teacherModel = response.teachers;
          this.teacherModel1 = response.teachers;
          // this.allResponseModel = [];
          this.teacherModel.forEach((obj) => {
            this.responseModel = obj.response;
            this.breakDataModel = obj.data;
            if (obj.trial_lesson_status == "1") {
              this.responseModel!.forEach((obj1) => {
                if (obj1.isBooked == 0) {
                  this.responseData1 = new responseModel();
                  this.responseData1 = obj1;
                  this.responseData1.start_date = obj1.start_date;
                  this.responseData1.teacherId = obj.id;
                  this.allResponseModel1.push(this.responseData1);
                  this.breakDataModel = obj.data;
                  var isBrack = false;
                  var i = 0;
                  for (i = 0; i < this.breakDataModel!.length; i++) {
                    if (
                      new Date(
                        this.componentsService.isrealToOtherContryDate(
                          obj1.start_date
                        )
                      ).getTime() >=
                        new Date(
                          this.componentsService.isrealToOtherContryDate(
                            this.breakDataModel![i].break_start_time
                          )
                        ).getTime() &&
                      new Date(
                        this.componentsService.isrealToOtherContryDate(
                          obj1.start_date
                        )
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
                    this.responseData = new responseModel();
                    this.responseData = obj1;
                    var timeStamp =
                      this.componentsService.isrealToOtherContryTime(
                        obj1.start_date
                      );
                    this.responseData.startTimeNumber = timeStamp.getTime();
                    this.responseData.start_date =
                      this.componentsService.isrealToOtherContryDate(
                        obj1.start_date
                      );
                    this.responseData.teacherId = obj.id;

                    this.allResponseModel.push(this.responseData);
                  }
                }
              });
            }
            this.changeDetector.detectChanges();
            this.breakResponseModel;
          });
          if (this.r < 6) {
            this.applyFilter(this.latesDate);
          }
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
        // this.isDisable = false;
      });
    this.changeDetector.detectChanges();
  }
  applyFilter(date: any) {
    // this.isDisable = true;
    const toDayDate = new Date(date);
    const newDate = format(toDayDate, "EEE MMM dd yyyy");

    this.responseSlot = this.allResponseModel.filter((item) =>
      item.start_date?.includes(newDate)
    );

    //     var groups = this.responseSlot.reduce(function(obj:any,item:any){
    //       obj[item.start_date] = obj[item.start_date] || [];
    //       obj[item.startTimeNumber] = obj[item.startTimeNumber] || [];
    //       // obj[item.start_date].push(item.startTimeNumber);
    //       return obj;
    //   }, {});
    //   var myArray = Object.keys(groups).map(function(key){
    //       return {start_date: key, startTimeNumber: groups[key]};
    //   });

    this.unicresponseSlot = Object.values(
      this.responseSlot.reduce((a: any, b: any) => {
        if (!a[b.start_date]) a[b.start_date] = b;
        return a;
      }, {})
    );
    this.unicresponseSlot.sort((a: any, b: any) =>
      a.start_date.localeCompare(b.start_date)
    );

    this.selectdat = "";
    if (this.selectdate != null) {
      this.isDisabled = false;
      // this.isDisabledBTN = false;
    }
    // this.isDisable = false;
  }

  selectDate(date: any) {
    if (date != this.selectdate) {
      this.isDisabled = true;
      const toDayDate = new Date(date);
      // this.bookTheClass(toDayDate);
      const newDate = format(toDayDate, "yyyy-MM-dd");
      this.findTeacherData = [];
      $(".nav-link").removeClass("active");
      this.selectdate = format(toDayDate, "EEEE d MMM yyyy");
      this.applyFilter(newDate);
      this.changeDetector.detectChanges();
    }
    this.isDisabledBTN = true;
  }
  selectSlot(date: any) {
    this.findSlotDate = date.start_date;
    this.selectdat = date.start_date;
    this.selectdateTime = this.componentsService.otherContryDateToIsrealDate(
      date.start_date
    );
    const DateTime = this.selectdateTime.split(" ");
    this.sloteDate = DateTime[0];
    this.sloteTime = DateTime[1];

    const data1 = this.allResponseModel.find(
      (item) => item.start_date === this.selectdat
    );

    this.findTeacher = this.allResponseModel.filter((item) =>
      item.start_date?.includes(this.selectdat)
    );
    // const data1= this.allResponseModel.filter((item, index) => item.start_date == this.selectdateTime);
    this.unicresponseTeacher = this.findTeacher
      .map((item) => item.teacherId)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.findTeacherData = [];
    this.teacherModel.forEach((objData) => {
      this.unicresponseTeacher.forEach((obj) => {
        if (obj == objData.id) {
          this.findTeacherModel = new TeacherModel();
          this.findTeacherModel.id = objData.id;
          this.findTeacherModel.first_name = objData.first_name;
          this.findTeacherModel.last_name = objData.last_name;
          this.findTeacherModel.teacher_ratings = objData.teacher_ratings;
          this.findTeacherModel.total_ratings = objData.total_ratings;
          this.findTeacherModel.last_seven_days_total_ratings =
            objData.last_seven_days_total_ratings;
          this.findTeacherModel.thumbnail = objData.thumbnail;
          if (objData.trial_lesson_status) {
            this.findTeacherData.push(this.findTeacherModel);
          }
        }
      });
    });
    this.isDisabledBTN = false;
    if (this.findTeacherData != null) {
      // $("booksess").removeClass("sesstiondetail");
    }

    // this.unicresponseTeacher= [];
    this.unicresponseTeacher = this.findTeacherData;
    // .map((item) => item.id);
    // .filter((value, index, self) => self.indexOf(value) === index);
    // this.unicresponseTeacher.sort((a, b) => a.localeCompare(b));
  }

  Last7Days(j: number) {
    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() + this.r);
    this.bookTheClass(myPastDate);
    this.result = [];
    const k = this.r + j;
    for (var i = 0; i < k; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      this.result.push(format(d, "EEEE d MMM yyyy"));
      format(d, "EEEE d MMM");
    }
    this.r = this.result.length;
    var d = new Date();
    this.selectdate = format(d, "EEEE d MMM yyyy");

    this.changeDetector.detectChanges();
    //
  }

  chooseTime(time: any) {
    if (time == "Morning" || time == "Afternoon" || time == "Evening") {
      this.router.navigate(["/registration"]);
      $("body").removeAttr("style");
      $("body").removeClass("modal-open");
      $("body").addClass("body");
      $(".modal-backdrop ").removeClass("fade");
      $(".modal-backdrop ").removeClass("show");
      $(".modal-backdrop").remove();
    } else {
    }
  }

  bookFirstLesson() {
    this.isDisabledBTN = true;
    let teacher;
    if (this.findTeacherData.length > 0) {
      teacher = this.findTeacherData[0].id;
    } else {
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

    this.onCheck("", teacher);
    let teacherData = this.findTeacherData.find(
      (item) => item.id === this.teacherId
    );
    this.teacherFirstName = teacherData?.first_name;
    this.teacherLastName = teacherData?.last_name;
    // console.log(this.teacherFirstName, this.teacherLastName, "techer");
    const data = {
      date: this.sloteDate,
      sloatId: this.sloatId,
      startTime: this.sloteTime,
      teacherId: this.teacherId,
      language: environment.language,
    };

    this.componentsService
      .addSlotToTempBookedSlot(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          localStorage.setItem("tFirstName", this.teacherFirstName);
          localStorage.setItem("tLastName", this.teacherLastName);
          localStorage.setItem("sloteDate", this.sloteDate);
          localStorage.setItem("sloatId", this.sloatId);
          localStorage.setItem("startTime", this.sloteTime);
          localStorage.setItem("teacherId", this.teacherId + "");
          localStorage.setItem("newLanding", "newLanding");

          this.router.navigate(["/registration"]);

          // this.isSuccess = true;
          // this.styleExp = "block";
          // localStorage.setItem("appointment_count", "1");
          // this.appointmentId = response.response.id;
          // let teacherData = this.findTeacherData.find(
          //   (item) => item.id === this.teacherId
          // );
          // this.teacherFirstName = teacherData?.first_name;
          // this.teacherLastName = teacherData?.last_name;
          // var minutesToAdd = 25;
          // var currentDate = new Date(this.selectdat);
          // this.futureDate = new Date(
          //   currentDate.getTime() + minutesToAdd * 60000
          // );
          // this.googleCalendarLink();
          // // });
          // // $("button").on("click", function(){

          // // });
          // // this.router.navigate(["/i-fal-menu/booklession"]);
        } else {
          this.styleExp = "none";
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
        // this.isDisabledBTN = false;
      });
  }
  onCheck(evt: any, teacherId?: any) {
    // var t =format(new Date("2022-05-25 18:00:00"), "yyyy-MM-dd HH:mm")

    // if (this.appointmentCount == "0") {
    this.teacherId = teacherId;
    // } else {
    //   this.teacherId = evt.id;
    //   this.teacherFirstName = evt.first_name;
    //   this.teacherLastName = evt.last_name;
    // }

    // this.sloatId = evt.id;
    var f = format(new Date(this.selectdateTime), "yyyy-MM-dd HH:mm");
    this.teacherModel1.forEach((obj) => {
      // this.responseModel = obj.response;
      // this.breakDataModel = obj.data;
      if (obj.id === this.teacherId) {
        obj.response!.forEach((obj1) => {
          // if(new Date(obj1.start_date!) === new Date(this.selectdateTime)){
          var t = format(new Date(obj1.start_date!), "yyyy-MM-dd HH:mm");

          if (t == f) {
            this.sloatId = obj1.id;
            // this.teacherFirstName.obj1.fi
          }
        });
      }

      this.breakResponseModel;
    });

    const AllTeachersSloat = this.allResponseModel.filter(
      (item) => item.teacherId == this.teacherId
    );
    const teacherSlot = AllTeachersSloat.filter(
      (item) => item.start_date == this.findSlotDate
    );
    teacherSlot.forEach((obj) => {
      this.sloatId = obj.id;
    });
    //   findSlotDate:any;
    if (
      this.teacherId != null &&
      this.sloteDate != null &&
      this.sloteTime != null &&
      this.sloatId != null
    ) {
      this.isDisabled = false;
    }
  }
  closePopup() {
    this.styleExp = "none";
  }
  sessionDetail() {
    var id = this.componentsService.encrypt(this.appointmentId);
    this.router.navigate(["/i-fal-menu/session-detail"], {
      queryParams: { id: id },
    });
  }
  session() {
    this.styleExp = "none";
    this.ngOnInit();
  }
  googleCalendarLink() {
    let endAppointmentDate = format(this.futureDate, "yyyy-MM-dd HH:mm:ss");
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
      this.teacherFirstName +
      "+" +
      this.teacherLastName +
      "&dates=" +
      startDateTime +
      "/" +
      endDateTime;
    this.googleCalendar = url;
  }
}
