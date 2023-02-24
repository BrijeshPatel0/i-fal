import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { format } from "date-fns";
import { ComponentsService } from "../../components.service";

import {
  dataModel,
  dataModeltest,
  NotesModel,
  ProfileModel,
  responseModel,
  SessionsModel,
  slotModel,
  TeacherModel,
} from "../../teacher.modal";
import * as $ from "jquery";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-book-lession",
  templateUrl: "./book-lession.component.html",
  styleUrls: ["./book-lession.component.css"],
})
export class BookLessionComponent implements OnInit {
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
  styleExp: any = "none";
  appointmentId: number = 0;
  teacherFirstName: any;
  teacherLastName: any;
  futureDate: any;
  appointmentCount: any;
  Loader: boolean = true;
  googleCalendar: any;
  currentTime: number = 0;
  isDisable: boolean = false;
  firstSloteDate: any;
  firstSloatId: any;
  firstStartTime: any;
  firstTeacherId: any;
  selectDateLast: any;
  firstTeacherFirstName: any;
  firstTeacherLastName: any;
  newLanding: any;
  sessionsModelData: SessionsModel[] = [];
  sessionsModelList: SessionsModel[] = [];
  sessionsModel: SessionsModel | undefined;
  totalItems: number = 0;
  page: number = 0;
  stylePreference: any = "none";
  isDontShow: boolean = false;
  notesForm!: FormGroup;
  notesModel: NotesModel = new NotesModel();
  sesssionSettings: any;
  profileModel!: ProfileModel;
  stylebusiness: any = "none";
  public directionController = new TextDirectionController();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    // private changeDetector1: NgbModal,
    private componentsService: ComponentsService // private icdCodeDialogModal: MatDialog,
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    // localStorage.setItem("appointment_count","1")
    this.appointmentCount = localStorage.getItem("appointment_count");
    this.firstSloteDate = localStorage.getItem("sloteDate");
    this.firstSloatId = localStorage.getItem("sloatId");
    this.firstStartTime = localStorage.getItem("startTime");
    this.firstTeacherId = Number(localStorage.getItem("teacherId"));
    this.firstTeacherFirstName = localStorage.getItem("tFirstName");
    this.firstTeacherLastName = localStorage.getItem("tLastName");
    this.newLanding = localStorage.getItem("newLanding");

    if (this.newLanding == "newLanding" || this.appointmentCount == "0") {
      this.getProfile();
    }
    this.upcommingAppointmentForUser();
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
    this.getSessionSettings()
    // $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".TeacherMN").addClass("active");
    const current = new Date();
    current.setMinutes(current.getMinutes() + 15)
    this.currentTime = current.getTime();
    $(".modal-backdrop").remove();

    this.findTeacherData = [];
    // this.selectdat = "";
    const toDayDate = new Date();
    this.selectdate = format(toDayDate, "EEEE d MMM yyyy");
    // this.bookTheClass();
    if (this.newLanding == "newLanding") {
      this.bookFirstLesson();
    }
  }

  registration() {
    this.router.navigate(["/registration"]);
  }
  latesDateNow: any;
  bookTheClass(newDate1?: any) {
    this.Loader = true;
    var latesDate;
    if (newDate1 != null) {
      // this.latesDate = newDate1;
      latesDate = format(newDate1, "yyyy-MM-dd");
    } else {
      const toDayDate = new Date();
      latesDate = format(toDayDate, "yyyy-MM-dd");
      this.latesDateNow = format(toDayDate, "yyyy-MM-dd");
    }
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      date: latesDate,
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    // this.responseSlot = [];
    // this.unicresponseSlot = [];
    this.componentsService
      .getAllTeachersSloats(data)
      .subscribe((response: any) => {
        $(".drag-scroll-content").css("overflow", "hidden");

        if (response.success === 1) {
          this.teacherModel = response.teachers;
          this.teacherModel1 = response.teachers;
          // this.allResponseModel = [];
          this.teacherModel.forEach((obj) => {
            if (this.appointmentCount == "0") {
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
                      var keepGoing = true;
                      this.sessionsModelList.forEach((obj) => {
                        if (keepGoing) {
                          if (
                            this.responseData?.start_date ==
                            obj.startAppointmentDate
                          ) {
                            this.responseData!.isAlready = 1;
                            keepGoing = false;
                          } else {
                            this.responseData!.isAlready = 0;
                          }
                        }
                      });
                      this.allResponseModel.push(this.responseData);
                    }
                  }
                });
              }
              this.changeDetector.detectChanges();
              this.breakResponseModel;
            } else {
              this.responseModel = obj.response;
              this.breakDataModel = obj.data;
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
                    var keepGoing = true;
                    this.sessionsModelList.forEach((obj) => {
                      if (keepGoing) {
                        if (
                          this.responseData?.start_date ==
                          obj.startAppointmentDate
                        ) {
                          this.responseData!.isAlready = 1;
                          keepGoing = false;
                        } else {
                          this.responseData!.isAlready = 0;
                        }
                      }
                    });
                    this.allResponseModel.push(this.responseData);
                  }
                }
              });
              this.changeDetector.detectChanges();
              this.breakResponseModel;
            }
          });

          if (this.r < 6) {
            this.applyFilter(format(new Date(), "EEE MMM dd yyyy"));
          } else {
            this.applyFilter(this.latesDate);
          }
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
      });
    this.changeDetector.detectChanges();
  }
  applyFilter(date: any) {
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
  }

  selectDate(date: any) {
    if (date != this.selectdate) {
      this.isDisable = true;
      this.Loader = true;
      const toDayDate = new Date(date);
      const newDate = format(toDayDate, "yyyy-MM-dd");

      $(".nav-link").removeClass("active");
      this.selectdate = format(toDayDate, "EEEE d MMM yyyy");
      this.applyFilter(newDate);
      this.changeDetector.detectChanges();
      this.findTeacherData = [];
      this.Loader = false;
      this.isDisable = false;
      this.sloatId = 0;
      this.teacherId = 0;
      this.sloteTime = null;
    }
    this.isDisabled = true;
  }
  selectSlot(appData: any) {
    this.findSlotDate = appData.start_date;
    this.selectdat = appData.start_date;
    this.selectdateTime =
      this.componentsService.otherContryDateToIsrealDate(appData.start_date);
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
          if (this.appointmentCount == "0") {
            if(objData.trial_lesson_status){
              this.findTeacherData.push(this.findTeacherModel);
            }
     
          } else {
            this.findTeacherData.push(this.findTeacherModel);
          }
        
        }
      });
    });
    if (this.findTeacherData != null) {
      $("booksess").removeClass("sesstiondetail");
    }
    if (this.appointmentCount == "0") {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    // this.unicresponseTeacher= [];
    this.unicresponseTeacher = this.findTeacherData;
    // .map((item) => item.id);
    // .filter((value, index, self) => self.indexOf(value) === index);
    // this.unicresponseTeacher.sort((a, b) => a.localeCompare(b));
  }

  Last7Days(j: number, loadMore?: any) {
    var myCurrentDate = new Date();
    this.findTeacherData = [];
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() + this.r);
    var fd = new Date();
    var dd = new Date(fd);
    this.latesDate = format(
      new Date(dd).setDate(dd.getDate() + this.r + j),
      "yyyy-MM-dd"
    );

    this.bookTheClass(myPastDate);
    this.result = [];
    const k = this.r + j;
    for (var i = 0; i < k; i++) {
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
    if (loadMore == "loadMore") {
      this.selectdate = this.result[this.result.length - 1].date;
      const newDate = format(new Date(this.selectdate), "EEEE d MMM yyyy");

      this.applyFilter(newDate);
      // this.selectDate(this.selectdate);
      this.findTeacherData = [];
    } else {
      var d = new Date();
      this.selectdate = format(d, "EEEE d MMM yyyy");
    }
    this.r = this.result.length;

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
    this.Loader = true;
    this.isDisabled = true;
    // this.router.navigate(["/registration"]);
    // $("body").removeAttr("style");
    // $("body").removeClass("modal-open");
    // $("body").addClass("body");
    // $(".modal-backdrop ").removeClass("fade");
    // $(".modal-backdrop ").removeClass("show");
    // $(".modal-backdrop").remove();

    var data = {};
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    if (this.newLanding == "newLanding") {
      data = {
        date: this.firstSloteDate,
        sloatId: this.firstSloatId,
        startTime: this.firstStartTime,
        teacherId: this.firstTeacherId,
        language: environment.language,
        deviceId:environment.deviceId,
        userId: userId,
        sessionId: sessionId,
      };
    } else {
      this.Loader = true;
      if (this.sloteTime == null) {
        this.Loader = false;
        if(this.directionController.textDirection == 'ltr'){
          this.snackBar.open("Please select at least one time slot", "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
        }else{
          this.snackBar.open("אנא בחר משבצת זמן אחת", "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
        }
        return;
      }
    
      if (this.appointmentCount == "0") {
        let teacher = this.findTeacherData[0].id;
        this.onCheck("", teacher);
      }else{
        if (this.teacherId == null || this.teacherId == 0) {
          this.Loader = false;
          if(this.directionController.textDirection == 'ltr'){
            this.snackBar.open("Please select teacher", "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
          }else{
            this.snackBar.open("אנא בחר מורה", "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
          }
          return;
        }
      }

      this.selectdateTime;
      this.teacherId;
      var userId = localStorage.getItem("userid");
      var sessionId = localStorage.getItem("sessionId");

      data = {
        date: this.sloteDate,
        sloatId: this.sloatId,
        startTime: this.sloteTime,
        teacherId: this.teacherId,
        language: environment.language,
        deviceId:environment.deviceId,
        userId: userId,
        sessionId: sessionId,
      };
    }

    this.componentsService.bookAppointment(data).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.isSuccess = true;
          // this.styleExp = "block";
          if (localStorage.getItem("isDontShow") == "true") {
            this.styleExp = "block";
          } else {
            this.stylePreference = "block";
          }

          if (this.newLanding == "newLanding") {
            this.sloteDate = this.firstSloteDate;
            var date = this.firstSloteDate + " " + this.firstStartTime;
            this.selectDateLast =
              this.componentsService.isrealToOtherContryDate(date);
            this.teacherFirstName = this.firstTeacherFirstName;
            this.teacherLastName = this.firstTeacherLastName;
            var minutesToAdd = 25;
            var currentDate = new Date(this.selectDateLast);
            this.futureDate = new Date(
              currentDate.getTime() + minutesToAdd * 60000
            );
            localStorage.setItem("newLanding", "");
          } else {
            var minutesToAdd = 25;
            this.selectDateLast = this.selectdat;
            var currentDate = new Date(this.selectDateLast);
            this.futureDate = new Date(
              currentDate.getTime() + minutesToAdd * 60000
            );
            let teacherData = this.findTeacherData.find(
              (item) => item.id === this.teacherId
            );
            this.teacherFirstName = teacherData?.first_name;
            this.teacherLastName = teacherData?.last_name;
          }
          localStorage.setItem("appointment_count", "1");
          this.appointmentId = response.response.id;

          this.googleCalendarLink();

          // });
          // $("button").on("click", function(){

          // });
          // this.router.navigate(["/i-fal-menu/booklession"]);
        } else if (response.success === 7) {
          this.router.navigate(["/i-fal-menu/member"]);
        } else {
          this.styleExp = "none";
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
        this.isDisabled = true;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  onCheck(evt: any, teacherId?: any) {
    // var t =format(new Date("2022-05-25 18:00:00"), "yyyy-MM-dd HH:mm")

    if (this.appointmentCount == "0") {
      this.teacherId = teacherId;
    } else {
      this.teacherId = evt.id;
      this.teacherFirstName = evt.first_name;
      this.teacherLastName = evt.last_name;
    }

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
    this.router.navigate(["/i-fal-menu"]);
  }
  closePopup1(){
    this.stylebusiness = "none";
  }
  sessionDetail() {
    var id = this.componentsService.encrypt(this.appointmentId);
    this.router.navigate(["/i-fal-menu/session-detail"], {
      queryParams: { id: id },
    });
  }
  session() {
    // this.router.navigate(["/i-fal-menu/booklession"]);
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
    let url = "";
    if (this.newLanding == "newLanding") {
      url =
        "https://calendar.google.com/calendar/r/eventedit?text=Session+with+" +
        this.firstTeacherFirstName +
        "+" +
        this.firstTeacherLastName +
        "&dates=" +
        startDateTime +
        "/" +
        endDateTime;
    } else {
      url =
        "https://calendar.google.com/calendar/r/eventedit?text=Session+with+" +
        this.teacherFirstName +
        "+" +
        this.teacherLastName +
        "&dates=" +
        startDateTime +
        "/" +
        endDateTime;
    }
    this.googleCalendar = url;
  }
  openCityInNewWindow() {
    this.router.navigate(["/i-fal-menu"]);
    window.open(this.googleCalendar, "_blank");
  }
  getProfile() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    var date = "GMT" + moment(new Date()).format("Z");
    const commonData = {
      language: environment.language,
      deviceId:environment.deviceId,
      userId: userId,
      sessionId: sessionId,
      timezone: date,
    };
    this.componentsService.getProfile(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        localStorage.setItem("getProfile", JSON.stringify(response.response));
        // this.getSessionSettings()
      } else {
      }

      this.Loader = false;
    });
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
              this.componentsService.isrealToOtherContryDate(startDate);
            this.sessionsModel.endAppointmentDate =
              this.componentsService.isrealToOtherContryDate(endDate);
            this.sessionsModel.appointment_date =
              this.componentsService.isrealToOtherContryDate(
                obj.appointment_date
              );
            this.sessionsModelList.push(this.sessionsModel);
            // this.sessionsModelList[0].sloat_id
          });
        } else {
        }
        this.Loader = false;
        this.Last7Days(5);
      });
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
            this.styleExp = "block";
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
    this.Loader=true;
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
    this.Loader=false;
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
