import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentsService } from "../components.service";
import {
  LastmonthScoreModel,
  SingleTeacherDetailsModel,
} from "../findteacher/teacher-modal";
import { ScoreModel } from "../teacher.modal";
import { ChartType } from "chart.js";
import { ChartConfiguration } from "chart.js";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements OnInit {
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];
  lineChartType: string = "line";

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
  isShow: boolean = false;
  @Output() refreshGrid: EventEmitter<any> = new EventEmitter<any>();
  name = "Angular 13";
  canvas: any;
  ctx: any;
  monthGraph: any;
  chartDataLabels:any=[];
  chartData:any=[];
  message:any = "";

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<"bar">["data"] = {
    labels: this.chartDataLabels,

    datasets: [
      {
        data: this.chartData,
        label: "Month",
        barPercentage: 0.6,
        backgroundColor: "#26a0fc",
        hoverBackgroundColor: "#8bcdff",
      },
      // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' }
    ],
  };
  public colors = [
    { backgroundColor: "red" },
    { backgroundColor: "green" },
    { backgroundColor: "blue" },
    { backgroundColor: "yellow" },
  ];
  public barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
  };
  styleExpClancel: any = "none";
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    public translateService: TranslateService
  ) {
    this.componentsService.currentMessage.subscribe(message => {
      this.directionController.textDirection = message
      // this.ngOnInit();
    // this.getStudentSummary();
    })
  }

  ngOnInit() {

    // $(".teachertab .test")
    // .addClass("active")
    // .siblings()
    // .removeClass("active");
  $(".AnalyticsMN").addClass("active");
    this.getStudentSummary();
  }
  public barChartType: ChartType = "bar";
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
        } else {
          this.isLevelUp = false;
          this.isIncreaseScore = true;
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
          this.userScore = response.response;
          // if(response.response == null){
          //   this.styleExpClancel = "block";
          //   this.Loader = true;
          // }
          // response.response.lastMonth.total_score=822;
          this.lastmonthScore = response.response.lastMonth;
          this.isShow = true;
          this.monthGraph = response.response.months;
          this.chartData = [];
          this.chartDataLabels = [];
          this.monthGraph.forEach((obj: any) => {
            this.chartDataLabels.push(obj.month);
            this.chartData.push(Number(obj.total_score));
          });
          this.barChartData = {
            labels: this.chartDataLabels,
            datasets: [
              {
                data: this.chartData,
                label: "Score",
                barPercentage: 0.6,
                backgroundColor: "#26a0fc",
                hoverBackgroundColor: "#8bcdff",
              },
              // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' }
            ],
          };

          this.getLevel(this.lastmonthScore!);
        } else {
          this.isShow = false;
          this.styleExpClancel = "block";
          this.message =response.message;
        }
        this.Loader = false;
      });
  }
  closePopup() {
    this.styleExpClancel = "none";
    this.router.navigate(["/i-fal-menu/"])
  }
}
