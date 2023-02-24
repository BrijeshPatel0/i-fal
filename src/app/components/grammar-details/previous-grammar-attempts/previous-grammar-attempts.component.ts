import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../../components.service";
import {
  AnswerListedModel,
  AnswerModel,
  ArticlesModel,
  GrammarModel,
  ReadingComprehensionModel,
} from "../../teacher.modal";

@Component({
  selector: 'app-previous-grammar-attempts',
  templateUrl: './previous-grammar-attempts.component.html',
  styleUrls: ['./previous-grammar-attempts.component.css']
})
export class PreviousGrammarAttemptsComponent implements OnInit {
  grammarModel: GrammarModel[] = [];
  answerListedModel: AnswerListedModel[] = [];
  Loader: boolean = true;
  direction: any;
  grammarId: any;
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
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");
    // this.getAttempts();
    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.grammarId = params["id"];
      this.grammarId = Number(this.componentsService.decrypt(this.grammarId));
      // this.appointmentStatus = params["statusType"] ? params["statusType"] : "";
    });
    this.getGrammarDetails();
  }
  getGrammarAttempts() {
    this.grammarModel = [];
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      grammarId: this.grammarId,
    };
    this.componentsService.getGrammarAttempts(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            debugger;
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
            this.grammarModel = [];
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

  getGrammarDetails() {
    this.grammarModel = [];
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      grammarId: this.grammarId,
    };
    this.componentsService.getGrammarDetails(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            debugger;
            this.readingComprehensionModel =
              response.response.reading_comprehension!;
              this.getGrammarAttempts();
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
  sessionDetail(articleId: any) {
    var id = this.componentsService.encrypt(articleId);
    if (articleId != null) {
      this.router.navigate(["/i-fal-menu/grammar-details"], {
        queryParams: { id: id },
      });
    }
  }
}
