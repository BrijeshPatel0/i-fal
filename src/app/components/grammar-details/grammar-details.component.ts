import { Component, ElementRef, OnInit, Pipe } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { ArticlesDetailsModel, ArticlesModel, GrammarDetailsModel, GrammarModel, PracticeWordsModel, ReadingComprehensionModel, SessionsModel, VocabularyDetailsModel } from "../teacher.modal";


@Component({
  selector: 'app-grammar-details',
  templateUrl: './grammar-details.component.html',
  styleUrls: ['./grammar-details.component.css']
})
export class GrammarDetailsComponent implements OnInit {
  grammarModel: GrammarModel[] = [];
  grammarDetailsModel: GrammarDetailsModel = new GrammarDetailsModel;
  readingComprehensionModel:ReadingComprehensionModel[] =[];
  vocabularyDetailsModel:VocabularyDetailsModel[]=[];
  Loader: boolean = true;
  direction: any;
  grammarId: any;
  // subscription: Subscription;
  AllFavouriteWord: PracticeWordsModel[] = [];
  AllFavouriteWordData: PracticeWordsModel[] = [];
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    
//     const source = interval(30000);
// const text = 'Your Text Here';
// this.subscription = source.subscribe(val => this.ngOnInit());
    
  }

  ngOnInit() {
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");

    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.grammarId = params["id"];
      this.grammarId = Number(
        this.componentsService.decrypt(this.grammarId)
      );
      // this.appointmentStatus = params["statusType"] ? params["statusType"] : "";
    });
    if(this.grammarId != null){
  
      setTimeout(()=>{
        this.getGrammarDetails();
      },1000);
    }

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
            console.log(response.response);
            
            this.grammarDetailsModel = response.response;
            this.readingComprehensionModel = this.grammarDetailsModel.reading_comprehension!;
            // this.vocabularyDetailsModel = this.grammarDetailsModel.vocabulary_details!;
            this.readingComprehensionModel?.forEach(element => {
              element.selectAnswer = '';
            });
            console.log(this.AllFavouriteWord);
            
            // this.vocabularyDetailsModel = [];
            // this.grammarDetailsModel.vocabulary_details?.forEach(element => {
            //   var same = this.AllFavouriteWord.find(x=>x.english == element.vocabulary_name )
            //     if(same != null ){
            //       element.id = same.id;
            //     }else{
            //       element.id = 0;
            //     }
            //     element.simple_sentenceNew = this.translateSentence(element.simple_sentence,element.vocabulary_name);
            //     this.vocabularyDetailsModel.push(element);
            // });
            console.log(this.vocabularyDetailsModel);
            
            // this.Loader = false;
          } else {
            this.grammarModel = [];
          }
        } catch (error) {
          this.Loader = false;
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  sessionDetail(grammarId: any) {
    var id = this.componentsService.encrypt(grammarId);
    if (grammarId != null) {
      this.router.navigate(["/i-fal-menu/article-details"], {
        queryParams: { id: id },
      });
    }
  }
  translateSentence(sentence:any,english:any){
    var newSentence = sentence?.replace(
      new RegExp(english, "gi"),
      (match: any) => {
        return '<strong class="">' + match + "</strong>";
      }
    );
    console.log(newSentence);
    
    return newSentence;
  }

  selectedAnswer(obj:any,index:number,ans:any){

    this.readingComprehensionModel[index].selectAnswer = ans;
  }
  AnswerList!:any[];
  onSubmit(){
    debugger;
    this.Loader = true;
    this.AnswerList = [];
    var checkAns = this.readingComprehensionModel.find(x=>x.selectAnswer == "")
    if(checkAns != null){
      this.snackBar.open("Please fill all the answers.", "", {
        panelClass: ["error", this.directionController.textDirection],
        direction: this.directionController.textDirection,
      });
      this.Loader = false;
      return
 
    }
    this.readingComprehensionModel.forEach(element => {
      this.AnswerList.push(element.selectAnswer); 
    });
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language, 
      userId: userId,
      sessionId: sessionId,
      grammarId: this.grammarId,
      answers:this.AnswerList.toString(),
    };
    this.componentsService.submitGrammarAttempt(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            this.snackBar.open(response.message, "", {
              panelClass: ["success", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
            this.readingComprehensionModel.forEach(element => {
              element.selectAnswer="";
            });
            console.log(response.response);
            this.Loader = false;
          } else {
          }
        } catch (error) {
          this.Loader = false;
        }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  previousAttempts(){
    var id = this.componentsService.encrypt(this.grammarId);
    if (this.grammarId != null) {
      this.router.navigate(["/i-fal-menu/previous-grammar-attempts"], {
        queryParams: { id: id },
      });
    }
  }


  ngAfterViewInit() {
    const all = document.querySelectorAll('.onlyKey');
    all.forEach((f: any) => {
      if (f) {
        this.elementRef.nativeElement.getElementById(f.id).onclick = (e:any) => this.openAlert(f);
      }
    });
  }
  openAlert(e:any) {
    // alert(e.id);
    console.log(e);
  }

}
