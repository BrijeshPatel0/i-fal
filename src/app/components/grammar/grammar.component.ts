import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { TextDirectionController } from 'src/app/service/TextDirectionController';
import { environment } from 'src/environments/environment';
import { ComponentsService } from '../components.service';
import { ArticlesModel, GrammarModel } from '../teacher.modal';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {
  grammarModel: GrammarModel[] = [];
  Loader: boolean = true;
  direction: any;
  // subscription: Subscription;

  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );

//     const source = interval(10000);
// const text = 'Your Text Here';
// this.subscription = source.subscribe(val => this.ngOnInit());
    
    // setInterval(() => {
    //   this.ngOnInit();
    // },3000)

  }
  ngOnInit() {

    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");
    this.getAllGrammars('BEGINNER');
    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
  }
  getAllGrammars(articleType:any) {
    this.grammarModel=[]
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
      .getAllGrammars(commonData)
      .subscribe((response: any) => {
        try {
          if (response.success === 1) {
            debugger;
            console.log(response.response);
            
            this.grammarModel = response.response;
          } else {
            this.grammarModel=[];
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
  grammarDetail(articleId: any) {
    var id = this.componentsService.encrypt(articleId);
    if (articleId != null) {
      this.router.navigate(["/i-fal-menu/grammar-details"], {
        queryParams: { id: id },
      });
    }
  }
}
