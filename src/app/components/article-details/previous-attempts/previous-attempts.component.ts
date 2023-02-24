import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../../components.service";
import {
  AnswerListedModel,
  AnswerModel,
  ArticlesModel,
  ReadingComprehensionModel,
} from "../../teacher.modal";

@Component({
  selector: "app-previous-attempts",
  templateUrl: "./previous-attempts.component.html",
  styleUrls: ["./previous-attempts.component.css"],
})
export class PreviousAttemptsComponent implements OnInit {
  articlesModel: ArticlesModel[] = [];
  answerListedModel: AnswerListedModel[] = [];
  Loader: boolean = true;
  direction: any;
  articleId: any;
  readingComprehensionModel: ReadingComprehensionModel[] = [];
  answerList: any[] = [];
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );

  }
  ngOnInit() {
    // debugger
    // var t = '18-02-2023 09:20:52';
    // var t1 = '2023-11-02 09:20:52';
    // let date = t.split(" ");
    // let dateDate = date[0].split("-");
    // var NewDate =
    //   dateDate[2] + "-" + dateDate[1] + "-" + dateDate[0] + " " + date[1];
    // var date2 = new Date(NewDate + ' UTC')
    // console.log(date2,"checkDate");
    
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");
    // this.getAttempts();
    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.articleId = params["id"];
      this.articleId = Number(this.componentsService.decrypt(this.articleId));
      // this.appointmentStatus = params["statusType"] ? params["statusType"] : "";
    });
    this.getArticleDetails();
  }
  getAttempts() {
    this.articlesModel = [];
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      articleId: this.articleId,
    };
    this.componentsService.getAttempts(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            this.answerListedModel = response.response;
            this.answerListedModel.forEach((element) => {
              element.date = this.componentsService.utcToLocal(
                element.date
              );
              this.answerList = [];
              element.answers?.forEach((element1: any,index:number) => {
                var answerModel = new AnswerModel();
                var ans = this.readingComprehensionModel[index].answer;
              if( ans == element1){
           
                answerModel.answer = element1
                answerModel.isAnswer = true;
              }else{
                answerModel.answer = element1
                answerModel.isAnswer = false;
              }
                this.answerList.push(answerModel)
              });
              element.answers = this.answerList;
            });
            this.Loader = false;
            // this.answerList = [];
            // response.response.answers.forEach((element: any) => {

            //   element.answer = element
            //   element.isAnswer = true;

            //   this.answerList.push(element)
            // });
            console.log(this.answerListedModel,'data');
          } else {
            this.articlesModel = [];
            this.Loader = false;
          }
        } catch (error) {
          this.Loader = false;
        }
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  sessionDetail(articleId: any) {
    var id = this.componentsService.encrypt(articleId);
    if (articleId != null) {
      this.router.navigate(["/i-fal-menu/article-details"], {
        queryParams: { id: id },
      });
    }
  }
  getArticleDetails() {
    this.articlesModel = [];
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      articleId: this.articleId,
    };
    this.componentsService.getArticleDetails(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            this.readingComprehensionModel =
              response.response.reading_comprehension!;
              this.getAttempts();
          } else {
            this.readingComprehensionModel = [];
          }
        } catch (error) {
          this.Loader = false;
        }
     
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
}
