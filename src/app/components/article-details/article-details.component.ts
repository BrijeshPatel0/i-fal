import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Pipe,
  ViewEncapsulation,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import {
  ArticlesDetailsModel,
  ArticlesModel,
  PracticeWordsModel,
  ReadingComprehensionModel,
  SessionsModel,
  VocabularyDetailsModel,
} from "../teacher.modal";

@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleDetailsComponent implements OnInit {
  articlesModel: ArticlesModel[] = [];
  articlesDetailsModel: ArticlesDetailsModel = new ArticlesDetailsModel();
  readingComprehensionModel: ReadingComprehensionModel[] = [];
  vocabularyDetailsModel: VocabularyDetailsModel[] = [];
  Loader: boolean = true;
  direction: any;
  articleId: any;
  AllFavouriteWord: PracticeWordsModel[] = [];
  AllFavouriteWordData: PracticeWordsModel[] = [];
  public directionController = new TextDirectionController();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    },
    nav: true
  }
  constructor(
    private router: Router,
    private componentsService: ComponentsService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    this.getAllFavouriteWord();
  }

  ngOnInit() {
    $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".MaterialMN").addClass("active");

    // this.pastAppointmentForUser();
    this.direction = localStorage.getItem("direction");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.articleId = params["id"];
      this.articleId = Number(this.componentsService.decrypt(this.articleId));
      // this.appointmentStatus = params["statusType"] ? params["statusType"] : "";
    });
    if (this.articleId != null) {
      setTimeout(() => {
        this.getArticleDetails();
      }, 1000);
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
            debugger;
            this.articlesDetailsModel = response.response;
            this.readingComprehensionModel =
              this.articlesDetailsModel.reading_comprehension!;
            // this.vocabularyDetailsModel = this.articlesDetailsModel.vocabulary_details!;
            this.readingComprehensionModel?.forEach((element) => {
              element.selectAnswer = "";
            });
            console.log(this.AllFavouriteWord);
            this.articlesDetailsModel.artical_description;
            this.vocabularyDetailsModel = [];
            this.articlesDetailsModel.vocabulary_details?.forEach((element) => {
              var same = this.AllFavouriteWord.find(
                (x) => x.english == element.vocabulary_name
              );
              if (same != null) {
                element.id = same.id;
              } else {
                element.id = 0;
              }
              element.simple_sentenceNew = this.translateSentence(
                element.simple_sentence,
                element.vocabulary_name
              );
              this.vocabularyDetailsModel.push(element);
              this.wordPopup(
                element,
                this.articlesDetailsModel.artical_description
              );
            });
            console.log(this.vocabularyDetailsModel);

            // this.Loader = false;
          } else {
            this.articlesModel = [];
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
  sessionDetail(articleId: any) {
    var id = this.componentsService.encrypt(articleId);
    if (articleId != null) {
      this.router.navigate(["/i-fal-menu/article-details"], {
        queryParams: { id: id },
      });
    }
  }
  translateSentence(sentence: any, english: any) {
    var newSentence = sentence?.replace(
      new RegExp(english, "gi"),
      (match: any) => {
        return '<strong class="">' + match + "</strong>";
      }
    );
    console.log(newSentence);

    return newSentence;
  }

  selectedAnswer(obj: any, index: number, ans: any) {
    this.readingComprehensionModel[index].selectAnswer = ans;
  }
  AnswerList!: any[];
  onSubmit() {
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
    this.readingComprehensionModel.forEach((element) => {
      this.AnswerList.push(element.selectAnswer);
    });
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      articleId: this.articleId,
      answers: this.AnswerList.toString(),
    };
    this.componentsService.submitAttempt(commonData).subscribe(
      (response: any) => {
        try {
          if (response.success === 1) {
            this.snackBar.open(response.message, "", {
              panelClass: ["success", this.directionController.textDirection],
              direction: this.directionController.textDirection,
            });
            this.readingComprehensionModel.forEach((element) => {
              element.selectAnswer = "";
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
  previousAttempts() {
    var id = this.componentsService.encrypt(this.articleId);
    if (this.articleId != null) {
      this.router.navigate(["/i-fal-menu/previous-attempts"], {
        queryParams: { id: id },
      });
    }
  }

  addFavouriteWord(wordsData: any, index: number) {
    debugger;
    this.Loader = true;
    // var checkFavouriteWord = this.AllFavouriteWord.filter(
    //   (item) => item.english == wordsData.english
    // );
    var userId: any = localStorage.getItem("userid");
    var sessionId: any = localStorage.getItem("sessionId");
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      englishWord: wordsData.vocabulary_name,
      spanishWord: wordsData.vocabulary_es,
      hebrewWord: wordsData.vocabulary_he,
      sampleSentence: wordsData.simple_sentence,
    };
    var form_data = new FormData();
    form_data.append("userId", userId);
    form_data.append("sessionId", sessionId);
    form_data.append("language", environment.language);
    form_data.append("englishWord", wordsData.vocabulary_name);
    form_data.append("spanishWord", wordsData.vocabulary_es);
    form_data.append("hebrewWord", wordsData.vocabulary_he);
    form_data.append("sampleSentence", wordsData.simple_sentence);
    form_data.append("deviceId", environment.deviceId);
    this.componentsService
      .addFavouriteWord(form_data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.vocabularyDetailsModel[index].id = response.response.id;
          this.snackBar.open(response.message, "", {
            panelClass: ["success", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
      });
  }

  ngAfterViewInit() {
    const all = document.querySelectorAll(".onlyKey");
    all.forEach((f: any) => {
      if (f) {
        this.elementRef.nativeElement.getElementById(f.id).onclick = (e: any) =>
          this.openAlert(f);
      }
    });
  }
  openAlert(e: any) {
    // alert(e.id);
    console.log(e);
  }

  getAllFavouriteWord() {
    this.Loader = true;
    var userId: any = localStorage.getItem("userid");
    var sessionId: any = localStorage.getItem("sessionId");
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    var form_data = new FormData();
    form_data.append("userId", userId);
    form_data.append("sessionId", sessionId);
    form_data.append("language", environment.language);
    form_data.append("deviceId", environment.deviceId);

    this.componentsService.getAllFavouriteWord(form_data).subscribe(
      (response: any) => {
        if (response.success === 1) {
          this.AllFavouriteWordData = response.response;
          this.AllFavouriteWord = this.AllFavouriteWordData.filter(
            (item) => item.is_from_app == "1"
          ).sort((a, b) => b.id - a.id);
          console.log(this.AllFavouriteWord);
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
  deleteFavouriteWord(FavouriteWord: any, index: number) {
    this.Loader = true;
    var userId: any = localStorage.getItem("userid");
    var sessionId: any = localStorage.getItem("sessionId");
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      wordId: FavouriteWord.id,
    };
    var form_data = new FormData();
    form_data.append("userId", userId);
    form_data.append("sessionId", sessionId);
    form_data.append("language", environment.language);
    form_data.append("wordId", FavouriteWord.id);
    form_data.append("deviceId", environment.deviceId);
    this.componentsService
      .deleteFavouriteWord(form_data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.snackBar.open(response.message, "", {
            panelClass: ["success", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
          this.vocabularyDetailsModel[index].id = 0;
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
        this.Loader = false;
      });
  }
  // artical innerHTML

@HostListener('document:click', ['$event'])
clickout(event: MouseEvent) {
  if(this.elementRef.nativeElement.contains(event.target)) {
    console.log("clicked inside");
  } else {
    console.log("clicked outside");
  }
}
//   onDocumentClick(event: MouseEvent) {
//     window.onclick = function (event) {
//       debugger
//       // var popup = document.getElementById('myDropdown');
//       // window.onclick = function(event) {
//         // if (event.target == popup) {
//         //     popup?.classList.remove('show');
//         // }
//       if (!(event.target as HTMLElement).matches('.dropbtn1')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//           var openDropdown = dropdowns[i];
//           if (openDropdown.classList.contains('show')) {
//             openDropdown.classList.remove('show');
//           }
//         }
//       }
//     }
//   }

  test(t: any) {
    $("." + t).toggleClass("onclick-repair-menu");
  }

  public wordPopup(query: VocabularyDetailsModel, content: any) {
    debugger;
    if (!query.vocabulary_name) {
      return content;
    }
    this.articlesDetailsModel.artical_description = content.replace(
      new RegExp(query.vocabulary_name, "gi"),
      (match: any, index: number) => {
        return (
          `<span class="dropdown1"><button onclick="{$('.myDropdown` +
          index +
          `').toggleClass('show');}" class="dropbtn1">` +
          match +
          `</span></button><span  id="myDropdown" class=" myDropdown` +
          index +
          ` t1 dropdown-content"> <span style="    display: flex;margin: auto; line-height: 15px;     justify-content: center;padding-top: 10px;"> <a onclick="{var voices = speechSynthesis.getVoices();
        var msg = new SpeechSynthesisUtterance('` +
          match +
          `');
        msg.lang = 'en-GB';
        msg.voice = voices.filter(function (voice) {
        return voice.name == 'Google UK English Female';
        })[0];
        speechSynthesis.speak(msg);}"  style="cursor: pointer;cursor: pointer; padding: 5px !important; width: 30px   !important;margin: 0px;" class=""><img style="width: 22px;" src="assets/images/teacher/speaker.png" alt=""></a><span style="padding: 5px;font-size: 22px;    white-space: unset; line-height: unset;text-transform:capitalize;">` +
          match +
          ` </span></span><span style="display: block; opacity: 0.5;">` +
          query.vocabulary_pronunciation +
          ` </span><span style="display: block;padding-bottom: 10px;">` +
          query.vocabulary_he +
          ` </span> <button class="buttonpopup" onclick="{$('.myDropdown` +
          index +
          `').toggleClass('show');}">Done</button></span>`
        );

        // onclick="{var voices = speechSynthesis.getVoices();
        //   var msg = new SpeechSynthesisUtterance('Female');
        //   msg.lang = 'en-GB';
        //   msg.voice = voices.filter(function (voice) {
        //   return voice.name == 'Google UK English Female';
        //   })[0];
        //   speechSynthesis.speak(msg);}"
      }
    );
    return this.articlesDetailsModel.artical_description;
  }
  activate(Class: any) {
    debugger
    let class1 = " ." + Class;
    $(".t1").removeClass("active");
    $(class1).addClass("active");
  }

}
