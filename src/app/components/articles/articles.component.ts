import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { ArticlesModel, SessionsModel } from "../teacher.modal";


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articlesModel: ArticlesModel[] = [];
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
  ngOnInit() {
  
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");
    this.getArticles('BEGINNER');
    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
  }
  getArticles(articleType:any) {
    this.articlesModel=[]
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      type:articleType
    };
    this.componentsService
      .getArticles(commonData)
      .subscribe((response: any) => {
        try {
          if (response.success === 1) {
            debugger;
            this.articlesModel = response.response;
          } else {
            this.articlesModel=[];
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
  sessionDetail(articleId: any) {
    var id = this.componentsService.encrypt(articleId);
    if (articleId != null) {
      this.router.navigate(["/i-fal-menu/article-details"], {
        queryParams: { id: id },
      });
    }
  }
}
