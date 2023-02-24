import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentsService } from "../components.service";
import { ProfileModel, SessionsModel } from "../teacher.modal";
import { FindTeacherModel, LastmonthScoreModel } from "./teacher-modal";
import format from "date-fns/format";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-findteacher",
  templateUrl: "./findteacher.component.html",
  styleUrls: ["./findteacher.component.css"],
})
export class FindteacherComponent implements OnInit {
  findTeacherModel!: FindTeacherModel[];
  percentDays: any = 0;
  lastpercentDays: any = 80;
  levelName: any = [];
  levelNameStart: any;
  levelNameEnd: any;
  lavel: number = 0;
  sessionsModelData: SessionsModel[] = [];
  sessionsModelList: SessionsModel[] = [];
  sessionsModel: SessionsModel | undefined;
  firstSessions: SessionsModel | undefined;
  isUpcomming: boolean = false;
  public counterNumber = 154;
  lastmonthScore: LastmonthScoreModel | undefined;
  profileModel: ProfileModel= new ProfileModel();
  total_score: any = 0;
  last_total_score: any = 0;
  progress = 30;
  progressBar = document.querySelector(".progress-bar");
  intervalId: any;
  isAnimation: boolean = false;
  isLevelUp: boolean = false;
  isIncreaseScore: boolean = false;
  styleExp: any = "none";
  styleExplanation: any = "none";
  Loader: boolean = true;
  isSubscriptionActive:any;
  freeRemainingSessions:any;
  advanced:any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService,
    public translateService: TranslateService
  ) {
    this.findTeacherModel = new Array<FindTeacherModel>();
    this.findAllTeacher();
    this.componentsService.currentMessage.subscribe(message => this.directionController.textDirection = message)
    var levelNameStart = this.translateService.get('levelName');
// console.log(levelNameStart,'levelNameStart');

// var yourTranslatedText = this.translateService.instant('advanced'); 
// console.log(yourTranslatedText,"yourTranslatedText");
   this.translateService.get('advanced').subscribe((translatedString) => {
      this.advanced = translatedString;
      // console.log(translatedString,"yourTranslatedObservableText");
      
   });

    this.levelName = [
      "Pre-Beginner",
      "Beginner",
      "Pre-Intermediate",
      "Intermediate",
      "Upper-Intermediate",
      "Pre-Advanced",
      "Advanced",
      "Proficient",
    ];
  }

  ngOnInit() {
    $(".teachertab .test")
    .addClass("active")
    .siblings()
    .removeClass("active");
  $(".TeacherMN").addClass("active");
    // this.findAllTeacher();
    // this.getLevel(200);
    this.upcommingAppointmentForUser();
    this.getProfile();
    const getDownloadProgress = () => {
      if (this.progress <= 99) {
        this.progress = this.progress;
      } else {
        clearInterval(this.intervalId);
      }
    };
    this.intervalId = setInterval(getDownloadProgress, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  // isrealToOtherContryDate(isrealDate: any) {
  //   const OtherDate = format(
  //     new Date(new Date(isrealDate + " GMT+0300").toUTCString()),
  //     "yyyy-MM-dd HH:mm:ss"
  //   );
  //   return OtherDate;
  // }
  findAllTeacher() {
    this.Loader=true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService
      .findAllTeacher(commonData)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.findTeacherModel = response.response;
        } else {
        }
        this.Loader=false;
      });
  }
  bookSession(teacherId: any) {
    var id = this.componentsService.encrypt(teacherId);
    this.router.navigate(["/i-fal-menu/teacher-detail"], {
      queryParams: { id: id },
    });
  }
  getLevel(monthScore: LastmonthScoreModel) {
    var lastMonthScore = localStorage.getItem("lastMonthScore");
    let roundScore = 0;
    let roundlastScore = 0;
    let levelNameStart = "";
    let levelNameEnd = "";
    let score = 0;
    let lastScore = 0;
    let isAnimation = false;
    let progress = 0;
    let last_total_score = 0;
    let testScore = 0;
    roundScore = Number(monthScore.total_score) / 10;
    roundlastScore = Number(lastMonthScore) / 10;
    roundScore = Number(monthScore.total_score) / 10;
    roundlastScore = Number(lastMonthScore) / 10;
    if (monthScore.total_score >= 100 && monthScore.total_score <= 300) {
      this.lavel = 1;
      levelNameStart = this.translateService.instant('Pre_Beginner');
      levelNameEnd = this.translateService.instant('Beginner');
      if (lastMonthScore == null) {
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (monthScore.last_total_score != "0") {
          lastScore = ((Number(monthScore.last_total_score) - 100) * 100) / 200;
        }
        this.total_score = score;
        last_total_score = 0;
        isAnimation = true;
        progress = roundScore;
        this.isIncreaseScore = true;
      } else if (lastMonthScore == monthScore.total_score) {
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (monthScore.last_total_score != "0") {
          lastScore = ((Number(monthScore.last_total_score) - 100) * 100) / 200;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
        testScore = roundScore * 10;
      } else {
        this.isIncreaseScore = true;
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (lastMonthScore != "0") {
          lastScore = ((Number(lastMonthScore) - 100) * 100) / 200;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "1") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 301 && monthScore.total_score <= 400) {
      this.lavel = 2;
      levelNameStart = this.translateService.instant('Beginner');
      levelNameEnd =this.translateService.instant('Pre_Intermediate');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 300;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 300;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 300;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 300;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 300;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 300;
        }
        this.total_score = score;
        last_total_score = lastScore;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "2") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 401 && monthScore.total_score <= 500) {
      this.lavel = 3;
      levelNameStart = this.translateService.instant('Pre_Intermediate');
      levelNameEnd = this.translateService.instant('Intermediate');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 400;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 400;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 400;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 400;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 400;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 400;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "3") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 501 && monthScore.total_score <= 600) {
      this.lavel = 4;
      levelNameStart = this.translateService.instant('Intermediate');
      levelNameEnd = this.translateService.instant('Upper_Intermediate');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 500;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 500;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 500;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 500;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 500;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 500;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "4") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 601 && monthScore.total_score <= 700) {
      this.lavel = 5;
      levelNameStart = this.translateService.instant('Upper_Intermediate');
      levelNameEnd = this.translateService.instant('Pre_Advanced');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 600;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 600;
        }
        this.total_score = score;
        last_total_score = 0;

        isAnimation = false;
        progress = progress + 3;
        isAnimation = true;
        progress = progress + 3;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 600;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 600;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 600;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 600;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "5") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 701 && monthScore.total_score <= 800) {
      this.lavel = 6;
      levelNameStart = this.translateService.instant('Pre_Advanced');
      levelNameEnd = this.translateService.instant('Advanced');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 700;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 700;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 700;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 700;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 700;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 700;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "6") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else if (monthScore.total_score >= 801 && monthScore.total_score <= 900) {
      this.lavel = 7;
      levelNameStart = this.translateService.instant('Advanced');
      levelNameEnd = this.translateService.instant('Proficient');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 800;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 800;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 800;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 800;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 800;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 800;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "7") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    } else {
      this.lavel = 8;
      levelNameStart = this.translateService.instant('Advanced'); 
      levelNameEnd = this.translateService.instant('Proficient');
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 900;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 900;
        }
        this.total_score = score;
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 900;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 900;
        }
        this.total_score = score;
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 900;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 900;
        }
        this.total_score = score;
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
        var level = localStorage.getItem("level");
        if (level != "8") {
          this.isIncreaseScore = false;
          this.isLevelUp = true;
          this.styleExp = "block";
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
          this.styleExp = "block";
        }
      }
    }
    this.levelNameStart = levelNameStart;
    this.levelNameEnd = levelNameEnd;
    this.total_score = score;
    this.last_total_score = last_total_score;
    this.isAnimation = isAnimation;
    this.progress = progress;
    this.testScore = testScore;
    localStorage.setItem("level", this.lavel.toString());
  }
  upcommingAppointmentForUser() {
    this.Loader=true;
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
          this.sessionsModelData.forEach((obj) => {
            this.sessionsModel = obj;
            let startDate='';
            let endDate='';
            obj.appointment_details!.forEach((obj1) => {
              this.sessionsModel!.appointmentId = obj1.id;
              startDate = obj.appointment_date + ' ' + obj1.from
              endDate = obj.appointment_date + ' ' + obj1.to
            });
            this.sessionsModel.startAppointmentDate = this.componentsService.isrealToOtherContryDate(
              startDate
            );
            this.sessionsModel.endAppointmentDate = this.componentsService.isrealToOtherContryDate(
              endDate
            );
           
            this.sessionsModel.appointment_date = this.componentsService.isrealToOtherContryDate(
              obj.appointment_date
            );
            this.sessionsModelList.push(this.sessionsModel);
          });
          if (this.sessionsModelList != null) {
            this.firstSessions = this.sessionsModelList[0];
            this.isUpcomming = true;
          }
        } else {
        }
        this.Loader=false;
      });
  }
  sessionDetail(appointmentId: any) {
    if (appointmentId != null) {
      var id = this.componentsService.encrypt(appointmentId);
      this.router.navigate(["/i-fal-menu/session-detail"], {
        queryParams: { id: id },
      });
    }
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
        this.profileModel = response.response;
        localStorage.setItem("getProfile", JSON.stringify(response.response));
        this.freeRemainingSessions = Number(this.profileModel.one_time_free_remaining_sessions) + Number(this.profileModel.recurring_free_remaining_sessions);
        // response.response.score.lastMonth.total_score = "822";
        this.isSubscriptionActive= response.response.is_subscription_active;
        
        this.lastmonthScore = response.response.score.lastMonth;
        localStorage.setItem(
          "lastMonthScore",
          response.response.score.lastMonth.total_score
        );
        this.getLevel(this.lastmonthScore!);
      } else {
      }
      this.Loader=false;
    });
  }
  testScore: any = 0;
  test() {
    this.testScore = this.lastmonthScore?.total_score;
  }
  closePopup() {
    this.styleExp = "none";
  }
  sessionReport() {
    // this.router.navigate(["/i-fal-menu/session-report"]);
    var id = this.componentsService.encrypt(this.profileModel?.last_appointment_id);
    this.router.navigate(["/i-fal-menu/session-report"], {
      queryParams: { id: id },
    });
  }
  explanationPopUp() {
    this.styleExplanation = "block";
    this.closePopup();
  }
  closeExplanationPopup() {
    this.styleExplanation = "none";
  }
}
