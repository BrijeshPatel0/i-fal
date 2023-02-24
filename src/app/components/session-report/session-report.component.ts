import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import {
  LastmonthScoreModel,
  SingleTeacherDetailsModel,
} from "../findteacher/teacher-modal";
import { ScoreModel } from "../teacher.modal";

@Component({
  selector: "app-session-report",
  templateUrl: "./session-report.component.html",
  styleUrls: ["./session-report.component.css"],
})
export class SessionReportComponent implements OnInit {
  appointmentId: number = 0;
  userAppointmentDetailsModel: any;
  singleTeacherDetailsModel: SingleTeacherDetailsModel | undefined;
  levelNameStart: any;
  levelNameEnd: any;
  lavel: number = 0;
  total_score: any = 0;
  last_total_score: any = 0;
  testScore: any;
  progress = 0;
  progressBar = document.querySelector(".progress-bar");
  isAnimation: boolean = false;
  isLevelUp: boolean = false;
  isIncreaseScore: boolean = false;
  lastmonthScore: LastmonthScoreModel | undefined;
  userScore: ScoreModel | undefined;
  Loader: boolean = true;
  direction:any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService
  ) {
    this.componentsService.currentMessage.subscribe(message => {
      this.directionController.textDirection = message
      // this.ngOnInit();
    this.getStudentSummary();
    })
  }

  ngOnInit() {
    // $(".teachertab .test")
    // .addClass("active")
    // .siblings()
    // .removeClass("active");
  $(".SessionsMN").addClass("active");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.appointmentId = params["id"] ? params["id"] : "";
      this.appointmentId = Number(this.componentsService.decrypt(this.appointmentId));
    });
    this.getSingleAppointmentDetails();
    // this.getStudentSummary();
    this.direction = localStorage.getItem('direction');
  }
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
          // console.warn(response);
          this.userAppointmentDetailsModel = response.response;
        } else {
          // this.styleExp="none";
          // this.router.navigate(["/i-fal-menu"]);
        }
        this.Loader = false;
      });
  }
  voice(text: any) {
    var voices = speechSynthesis.getVoices();
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-GB";
    msg.voice = voices.filter(function (voice) {
      return voice.name == "Google UK English Female";
    })[0];
    speechSynthesis.speak(msg);
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
    if (monthScore.total_score >= 100 && monthScore.total_score <= 300) {
      this.lavel = 1;
      levelNameStart = "Pre-Beginner";
      levelNameEnd = "Beginner";
      if (lastMonthScore == null) {
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (monthScore.last_total_score != "0") {
          lastScore = ((Number(monthScore.last_total_score) - 100) * 100) / 200;
        }
        last_total_score = 0;
        isAnimation = true;
        progress = roundScore;
        testScore = roundScore * 10;
        this.isIncreaseScore = true;
      } else if (lastMonthScore == monthScore.total_score) {
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (monthScore.last_total_score != "0") {
          lastScore = ((Number(monthScore.last_total_score) - 100) * 100) / 200;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        this.isIncreaseScore = true;
        score = ((Number(monthScore.total_score) - 100) * 100) / 200;
        if (lastMonthScore != "0") {
          lastScore = ((Number(lastMonthScore) - 100) * 100) / 200;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 301 && monthScore.total_score <= 400) {
      this.lavel = 2;
      levelNameStart = "Beginner";
      levelNameEnd = "Pre-Intermediate";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 300;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 300;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 300;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 300;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 300;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 300;
        }
        last_total_score = lastScore;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 401 && monthScore.total_score <= 500) {
      this.lavel = 3;
      levelNameStart = "Pre-Intermediate";
      levelNameEnd = "Intermediate";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 400;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 400;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 400;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 400;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 400;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 400;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 501 && monthScore.total_score <= 600) {
      this.lavel = 4;
      levelNameStart = "Intermediate";
      levelNameEnd = "Upper-Intermediate";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 500;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 500;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 500;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 500;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 500;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 500;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 601 && monthScore.total_score <= 700) {
      this.lavel = 5;
      levelNameStart = "Upper-Intermediate";
      levelNameEnd = "Pre-Advanced";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 600;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 600;
        }
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
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 600;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 600;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 701 && monthScore.total_score <= 800) {
      this.lavel = 6;
      levelNameStart = "Pre-Advanced";
      levelNameEnd = "Advanced";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 700;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 700;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 700;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 700;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 700;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 700;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else if (monthScore.total_score >= 801 && monthScore.total_score <= 900) {
      this.lavel = 7;
      levelNameStart = "Advanced";
      levelNameEnd = "Proficient";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 800;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 800;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 800;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 800;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
        progress = roundlastScore;
      } else {
        score = Number(monthScore.total_score) - 800;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 800;
        }
        last_total_score = lastScore;
        isAnimation = false;
        3;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
      }
    } else {
      this.lavel = 8;
      levelNameStart = "Advanced";
      levelNameEnd = "Proficient";
      if (lastMonthScore == null) {
        score = Number(monthScore.total_score) - 900;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 900;
        }
        last_total_score = 0;
      } else if (lastMonthScore == monthScore.total_score) {
        score = Number(monthScore.total_score) - 900;
        if (monthScore.last_total_score != "0") {
          lastScore = Number(monthScore.last_total_score) - 900;
        }
        last_total_score = score;
        isAnimation = false;
        progress = roundScore;
      } else {
        score = Number(monthScore.total_score) - 900;
        if (lastMonthScore != "0") {
          lastScore = Number(lastMonthScore) - 900;
        }
        last_total_score = lastScore;
        isAnimation = false;
        progress = roundlastScore;
        testScore = roundScore * 10;
        setTimeout(() => {
          isAnimation = true;
          progress = roundScore;
        }, 1000);
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

  getStudentSummary() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };

    this.componentsService
      .getStudentSummary(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          // console.warn(response);
          // response.response.lastMonth.total_score = "250";
          this.userScore = response.response;
          this.lastmonthScore = response.response.lastMonth;
          this.getLevel(this.lastmonthScore!);
        } else {
          // this.styleExp="none";
          // this.router.navigate(["/i-fal-menu"]);
        }
        this.Loader = false;
      });
  }
  test() {
    this.testScore = this.lastmonthScore?.total_score;
  }
}
