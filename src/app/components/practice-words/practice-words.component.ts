import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subject } from "rxjs";
import { ComponentsService } from "../components.service";
import { PracticeWordsModel } from "../teacher.modal";
import { takeUntil } from "rxjs/operators";
import format from "date-fns/format";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-practice-words",
  templateUrl: "./practice-words.component.html",
  styleUrls: ["./practice-words.component.css"],
})
export class PracticeWordsComponent implements OnInit {
  styleExp: any = "none";
  appointmentTabs: any;
  practisceTitle: any = [];
  practiceWordsModel: PracticeWordsModel | undefined;
  deleteWordsData: any;
  beginner_words: PracticeWordsModel[] = [];
  advanced_words: PracticeWordsModel[] = [];
  intermediate_words: PracticeWordsModel[] = [];
  AllPracticeWords: PracticeWordsModel[] = [];
  AllPracticeWordsData: PracticeWordsModel[] = [];
  AllFavouriteWord: PracticeWordsModel[] = [];
  AllFavouriteWordData: PracticeWordsModel[] = [];
  // AllFavouriteWordCheck: PracticeWordsModel[] = [];
  isActive: boolean = false;
  isSetting: boolean = false;
  wordEnglish: any;
  wordHebrew: any;
  wordsData: any;
  wordSentence: any;
  removebtn: boolean | undefined;
  isSearch: boolean = false;
  Loader: boolean = true;
  practiceWords: any;
  isWordOfDay: boolean = false;
  noRecord: any = "Favorites";
  activeTabMenu: any = "Favorites Words";
  public wordFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject();
  listGroup:any=1;
  languageGroup:any = 1;
  listGroup1:any=1;
  languageGroup1:any = 1;
  isList:boolean = false;
  public directionController = new TextDirectionController();
  constructor(
    private http: HttpClient,
    private componentsService: ComponentsService,
    private snackBar: MatSnackBar
  ) {
    this.componentsService.currentMessage.subscribe(
      (message) => (this.directionController.textDirection = message)
    );
    this.noRecord = "Favorites";
    this.beginnerWords().subscribe((data: any) => {
      this.beginner_words = data;
      this.beginner_words = this.beginner_words.sort((a, b) =>
        a.english.localeCompare(b.english)
      );
      this.beginner_words.forEach((element) => {
        this.AllPracticeWords.push(element);
      });
    });
    this.advancedWords().subscribe((data: any) => {
      this.advanced_words = data;
      this.advanced_words = this.advanced_words.sort((a, b) =>
        a.english.localeCompare(b.english)
      );
      this.advanced_words.forEach((element) => {
        this.AllPracticeWords.push(element);
      });
    });
    this.intermediateWords().subscribe((data: any) => {
      this.intermediate_words = data;
      this.intermediate_words = this.intermediate_words.sort((a, b) =>
        a.english.localeCompare(b.english)
      );
      this.intermediate_words.forEach((element) => {
        this.AllPracticeWords.push(element);
      });
    });
    this.AllPracticeWordsData = this.AllPracticeWords;
    this.appointmentTabs = ["Beginner", "Intermediate", "Advanced"];
    this.practisceTitle = [
      "Favorites Words",
      "{{'session_words' | translate }}",
      "Both",
    ];
  }
  public beginnerWords(): Observable<any> {
    return this.http.get("./assets/beginner_words.json");
  }
  public advancedWords(): Observable<any> {
    return this.http.get("./assets/advanced_words.json");
  }
  public intermediateWords(): Observable<any> {
    return this.http.get("./assets/intermediate_words.json");
  }
  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 4
      }
    },
    nav: true
  }
  // Test:test[] =beginner_wordsData
  ngOnInit() {
    // $(".teachertab .test").addClass("active").siblings().removeClass("active");
    $(".PracticeMN").addClass("active");
    this.wordFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterWebsiteMulti();
      });
    this.getAllFavouriteWord();
   
    this.listGroup = Number(localStorage.getItem('listGroup'))?Number(localStorage.getItem('listGroup')):1;
    this.languageGroup = Number(localStorage.getItem('languageGroup'))?Number(localStorage.getItem('languageGroup')):1;

    setTimeout(() => {
      this.getWord();
    },1000)

    
  }
  searchPopup() {
    this.styleExp = "block";
  }
  closePopup() {
    this.styleExp = "none";
    this.wordFilterCtrl.reset();
    // this.filterWebsiteMulti();
    this.isSearch = false;
    // this.ngOnInit();
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

  selectedIndex: number = 0;
  loadComponent(event: any) {
    // this.selectedIndex = event.index;
    switch (event) {
      case "Favorites Words":
        this.noRecord = "Favorites";
        this.activeTabMenu = "Favorites Words";
        this.AllFavouriteWord = this.AllFavouriteWordData.filter(
          (item) => item.is_from_app == "1"
        );
        break;
      case "Session Words":
        this.noRecord = "Session";
        this.activeTabMenu = "Session Words";
        this.AllFavouriteWord = this.AllFavouriteWordData.filter(
          (item) => item.is_from_app == "0"
        );
        break;
      case "Both":
        this.AllFavouriteWord = this.AllFavouriteWordData;
        this.activeTabMenu = "Both";
        break;
      default:
        break;
    }
  }
  selectedIndexSearch: number = 0;
  loadComponentSerch(event: any) {
    this.selectedIndexSearch = event;
    // switch (event.tab.textLabel) {
    //   case "Beginner":
    //     this.AllFavouriteWord = this.AllFavouriteWordData.filter(
    //       (item) => item.is_from_app == "1"
    //     );
    //     break;
    //   case "intermediate":
    //     this.AllFavouriteWord = this.AllFavouriteWordData.filter(
    //       (item) => item.is_from_app == "0"
    //     );
    //     break;
    //   case "advanced":
    //     this.AllFavouriteWord = this.AllFavouriteWordData;
    //     break;
    //   default:
    //     break;
    // }
  }
  addFavorite(wordsData: any, isActive: boolean) {
    debugger
    this.wordsData = wordsData;
    this.isActive = !isActive;
    this.wordEnglish = wordsData.english;
    this.wordHebrew = wordsData.hebrew;
    this.wordSentence = wordsData.sentence;
    // this.AllFavouriteWord.find
    this.wordSentence = this.translateSentence(wordsData.sentence,this.wordEnglish);
    // this.wordSentence = wordsData.sentence.replace(
    //   new RegExp(this.wordEnglish, "gi"),
    //   (match: any) => {
    //     return '<strong>' + match + "</strong>";
    //   }
    // );

    this.deleteWordsData = this.AllFavouriteWord.find(
      (item) => item.english === wordsData.english
    );
    this.removebtn = this.deleteWordsData ? true : false;
  }
  addFavouriteWord(wordsData: any) {
    this.Loader = true;
    var checkFavouriteWord = this.AllFavouriteWord.filter(
      (item) => item.english == wordsData.english
    );
    if (checkFavouriteWord.length == 0) {
      var userId: any = localStorage.getItem("userid");
      var sessionId: any = localStorage.getItem("sessionId");
      const data = {
        language: environment.language,
        userId: userId,
        sessionId: sessionId,
        englishWord: wordsData.english,
        spanishWord: wordsData.spanish,
        hebrewWord: wordsData.hebrew,
        sampleSentence: wordsData.sentence,
      };
      var form_data = new FormData();
      form_data.append("userId", userId);
      form_data.append("sessionId", sessionId);
      form_data.append("language", environment.language);
      form_data.append("englishWord", wordsData.english);
      form_data.append("spanishWord", wordsData.spanish);
      form_data.append("hebrewWord", wordsData.hebrew);
      form_data.append("sampleSentence", wordsData.sentence);
      form_data.append("deviceId", environment.deviceId);
      this.componentsService
        .addFavouriteWord(form_data)
        .subscribe((response: any) => {
          if (response.success === 1) {
            this.isWordOfDay = true;
            let object = new PracticeWordsModel();
            object = response.response;
            let index = 0;
            this.AllFavouriteWord.splice(0, 0, object);
            if(this.activeTabMenu != "Both"){
              this.AllFavouriteWordData.splice(0, 0, object);
            }
           
            // this.AllFavouriteWordCheck.splice(0, 0, object);
            this.addFavorite(object, false);
            this.loadComponent(this.activeTabMenu)
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
    } else {
      this.snackBar.open("All ready exists", "", {
        panelClass: ["error", this.directionController.textDirection],
        direction: this.directionController.textDirection,
      });
      this.Loader = false;
    }
  }

  protected filterWebsiteMulti() {
    let search = this.wordFilterCtrl.value;
    if (search == "") {
      this.isSearch = false;
      this.AllPracticeWordsData = this.AllPracticeWords;
    } else {
      this.isSearch = true;
      this.AllPracticeWordsData = this.AllPracticeWords.filter(
        (item) => item.english.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }
  }

  toggleFlip(i?: number) {
    $(".togcard" + i).toggleClass("flipped");
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
          // this.AllFavouriteWordCheck = response.response;
          this.AllFavouriteWord = this.AllFavouriteWordData.filter(
            (item) => item.is_from_app == "1"
          ).sort((a, b) => b.id - a.id);

          // this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] });
        } else {
          this.snackBar.open(response.message, "", {
            panelClass: ["error", this.directionController.textDirection],
            direction: this.directionController.textDirection,
          });
        }
      this.getWord();
        let test = localStorage.getItem("newWord");
        let wordOfDay;
        if(test == 'null'){
          test = null;
        }else{
          wordOfDay = this.AllFavouriteWordData.filter(
            (item) => item.english == test
          );
        }
     
        // console.log(wordOfDay, "wordOfDay");
        if (wordOfDay && !wordOfDay.length) {
          this.isWordOfDay = false;
          // console.log(this.isWordOfDay, "1");
        } else {
          this.isWordOfDay = true;
          // console.log(this.isWordOfDay, "0");
        }

        // var level = localStorage.getItem("level");
        // var date = format(new Date(), "yyyy-MM-dd");
        // var oldDate = localStorage.getItem("Date");
        // let wordnew = localStorage.getItem("newWord");
        // // if (wordnew == null) {
        // //   this.practiceWords =
        // //     this.advanced_words[
        // //       Math.floor(Math.random() * this.advanced_words.length)
        // //     ];
        // //   localStorage.setItem("newWord", this.practiceWords.english);
        // // }
        // if (oldDate == date) {
        //   let word = localStorage.getItem("newWord");
        //   if (Number(level) < 3) {
        //     this.practiceWords = this.beginner_words.find(
        //       (item) => item.english == word
        //     );
        //   } else if (Number(level) < 6) {
        //     this.practiceWords = this.intermediate_words.find(
        //       (item) => item.english == word
        //     );
        //   } else {
        //     this.practiceWords = this.advanced_words.find(
        //       (item) => item.english == word
        //     );
        //   }
        // } else {
        //   if (Number(level) < 3) {
        //     this.practiceWords =
        //       this.beginner_words[
        //         Math.floor(Math.random() * this.beginner_words.length)
        //       ];
        //     localStorage.setItem("newWord", this.practiceWords.english);
        // //     console.log(this.practiceWords, "test 3");
        //   } else if (Number(level) < 6) {
        //     this.practiceWords =
        //       this.intermediate_words[
        //         Math.floor(Math.random() * this.intermediate_words.length)
        //       ];
        //     localStorage.setItem("newWord", this.practiceWords.english);
        // //     console.log(this.practiceWords, "test 6");
        //   } else {
        //     this.practiceWords =
        //       this.advanced_words[
        //         Math.floor(Math.random() * this.advanced_words.length)
        //       ];
        //     localStorage.setItem("newWord", this.practiceWords.english);
        // //     console.log(this.practiceWords, "test 9");
        //   }
        //   var date = format(new Date(), "yyyy-MM-dd");
        //   localStorage.setItem("Date", date);
        //   var oldDate = localStorage.getItem("Date");
        // }
        // if (this.practiceWords == null) {
        //   this.getAllFavouriteWord();
        // }
        this.Loader = false;
      },
      (error) => {
        this.Loader = false;
      }
    );
  }
  getWord(){
    debugger
    let word = localStorage.getItem("newWord");
    if(word == 'null'){
      word = null;
    }
    // console.log(word, "word");

    var level = localStorage.getItem("level");
    // console.log(localStorage.getItem("level"), "level");

    var date = format(new Date(), "yyyy-MM-dd");
    var newdateChek = new Date();
    var newDateChek = format(newdateChek, "yyyy-MM-dd");
    if (localStorage.getItem("wordDate") != newDateChek) {
      word = null;
    }
    if (word == null) {
      if (Number(level) < 3) {
        this.practiceWords =
          this.beginner_words[
            Math.floor(Math.random() * this.beginner_words.length)
          ];
        localStorage.setItem("newWord", this.practiceWords.english);
        // console.log(this.practiceWords, "test 3");
      } else if (Number(level) < 6) {
        this.practiceWords =
          this.intermediate_words[
            Math.floor(Math.random() * this.intermediate_words.length)
          ];
        localStorage.setItem("newWord", this.practiceWords.english);
        // console.log(this.practiceWords, "test 6");
      } else {
        this.practiceWords =
          this.advanced_words[
            Math.floor(Math.random() * this.advanced_words.length)
          ];
        localStorage.setItem("newWord", this.practiceWords.english);
        // console.log(this.practiceWords, "test 9");
      }
      var date = format(new Date(), "yyyy-MM-dd");
      localStorage.setItem("wordDate", date);
      var oldDate = localStorage.getItem("wordDate");
    } else {
      let word = localStorage.getItem("newWord");
      if (Number(level) < 3) {
        this.practiceWords = this.beginner_words.find(
          (item) => item.english == word
        );
      } else if (Number(level) < 6) {
        this.practiceWords = this.intermediate_words.find(
          (item) => item.english == word
        );
      } else {
        this.practiceWords = this.advanced_words.find(
          (item) => item.english == word
        );
      }
    }
  }
  deleteFavouriteWord(FavouriteWord: PracticeWordsModel) {
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
          let word = localStorage.getItem("newWord");
          if(word == 'null'){
            word = null;
          }else{
            if (FavouriteWord.english == word) {
              this.isWordOfDay = false;
            }
          }
        
          // this.getAllFavouriteWord();
          const index: number = this.AllFavouriteWord.indexOf(FavouriteWord);
          if (index !== -1) {
            this.AllFavouriteWord.splice(index, 1);
            // this.AllFavouriteWordCheck.splice(index, 1);

            this.addFavorite(FavouriteWord, false);
          }

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
  loadComponent1(event: any) {
    switch (event) {
      case 1:
        this.listGroup= 1;
        localStorage.setItem('listGroup',this.listGroup)
        break;
      case 2:
        this.listGroup= 2;
        localStorage.setItem('listGroup',this.listGroup)
        break;
      default:
        break;
    }
  }
  loadComponent2(event: any) {
    switch (event) {
      case 1:
        this.languageGroup= 1;
        localStorage.setItem('languageGroup',this.languageGroup)
        break;
      case 2:
        this.languageGroup= 2;
        localStorage.setItem('languageGroup',this.languageGroup)
        break;
      default:
        break;
    }
  }
  setting(isSetting:boolean){
    this.isSetting = !isSetting;
  }

  loadComponent3(event: any) {
    this.listGroup1 = event
  }
  loadComponent4(event: any) {
    this.languageGroup1= event
  }
  translateSentence(sentence:any,english:any){
    var newSentence = sentence?.replace(
      new RegExp(english, "gi"),
      (match: any) => {
        return '<strong>' + match + "</strong>";
      }
    );
    return newSentence;
  }
  //   translateSentence(sentence:any,english:any){
  //   // var newSentence = sentence?.replace(
  //   //   new RegExp(english, "gi"),
  //   //   (match: any) => {
  //   //     return '<strong>' + match + "</strong>";
  //   //   }
  //   // );
  //   return sentence;
  // }
}
