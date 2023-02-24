import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { ComponentsService } from "../components.service";
import { format } from "date-fns";
import { responseModel, TeacherModel } from "../teacher.modal";
import * as moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";
import { OwlOptions } from "ngx-owl-carousel-o";
import { CountryISO, PhoneNumberFormat, SearchCountryField } from "ngx-intl-tel-input";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { TextDirectionController } from "src/app/service/TextDirectionController";

// export const onlyCountries =
// ['af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'ag', 'ar', 'am', 'aw', 'au', 'at', 'az', 'bs', 'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bm',
// 'bt', 'bo', 'ba', 'bw', 'br', 'io', 'vg', 'bn', 'bg', 'bf', 'bi', 'kh', 'cm', 'ca', 'cv', 'bq', 'ky', 'cf', 'td', 'cl', 'cn', 'cx', 'cc',
// 'co', 'km', 'cd', 'cg', 'ck', 'cr', 'ci', 'hr', 'cu', 'cw', 'cy', 'cz', 'dk', 'dj', 'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'et',
// 'fk', 'fo', 'fj', 'fi', 'fr', 'gf', 'pf', 'ga', 'gm', 'ge', 'de', 'gh', 'gi', 'gr', 'gl', 'gd', 'gp', 'gu', 'gt', 'gn', 'gw', 'gy', 'ht',
// 'hn', 'hk', 'hu', 'is', 'in', 'id', 'ir', 'iq', 'ie', 'il', 'it', 'jm', 'jp', 'jo', 'kz', 'ke', 'ki', 'xk', 'kw', 'kg', 'la', 'lv',
// 'lb', 'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mo', 'mk', 'mg', 'mw', 'my', 'mv', 'ml', 'mt', 'mh', 'mq', 'mr', 'mu', 'yt', 'mx', 'fm', 'md',
// 'mc', 'mn', 'me', 'ms', 'ma', 'mz', 'mm', 'na', 'nr', 'np', 'nl', 'nc', 'nz', 'ni', 'ne', 'ng', 'nu', 'nf', 'kp', 'mp', 'no', 'om', 'pk',
// 'pw', 'ps', 'pa', 'pg', 'py', 'pe', 'ph', 'pl', 'pt', 'pr', 'qa', 're', 'ro', 'ru', 'rw', 'bl', 'sh', 'kn', 'lc', 'mf', 'pm', 'vc', 'ws',
// 'sm', 'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg', 'sx', 'sk', 'si', 'sb', 'so', 'za', 'kr', 'ss', 'es', 'lk', 'sd', 'sr', 'sj', 'sz', 'se',
// 'ch', 'sy', 'tw', 'tj', 'tz', 'th', 'tl', 'tg', 'tk', 'to', 'tt', 'tn', 'tr', 'tm', 'tc', 'tv', 'vi', 'ug', 'ua', 'ae', 'gb', 'us', 'uy',
// 'uz', 'vu', 'va', 've', 'vn', 'wf', 'eh', 'ye', 'zm', 'zw', 'ax'
// ];


@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
  // encapsulation:ViewEncapsulation.None
})
// @Pipe({ name: "safe" })
export class HomepageComponent implements OnInit {
  teacherModel: TeacherModel[] = [];
  responseModel: responseModel[] | undefined;
  responseModel1: responseModel[] = [];
  allResponseModel: responseModel[] = [];
  responseData: responseModel | undefined;
  responseSlot: responseModel[] = [];
  unicresponseSlot: any[] = [];
  favoriteSeason: string | undefined;
  latesDate: any;
  selectdat: any;
  selectdate: any;
  r: number = 5;
  result: any = [];
  // onlyCountries:any=onlyCountries;
  videoURL:any;
  seasons: string[] = ["Morning", "Afternoon", "Evening"];
  styleExp:any="none";
  styleExpThanks:any="none";
  styleExpPop:any="none";
  panelOpenState = false;
  pricingListed: any;
  Loader:boolean=true;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.India,CountryISO.Israel];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
  questionsForm!: FormGroup;
  mobileData: any;
  countryCode: any;
  mobile: any;
  teacherVideos:any;
  teacherReviews:any;
  currencySymbol:any;
  browserLang:any;
  countryPhone:any;
  countryName:any;
  message:any;
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private componentsService: ComponentsService ,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    private activeRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((val: any) => {
      this.activeRoute.queryParams.subscribe((param:any) => {
        var element = document.getElementById(param["pageSec"]);
        if (element) {
            element.scrollIntoView(true);
        }
    })
    });
    this.componentsService.currentMessage.subscribe(message => {
      this.directionController.textDirection = message
      setInterval(() => {
      if(this.directionController.textDirection == 'ltr'){
        $("#profile .owl-prev").css("width", "58px");
        $("#profile .owl-prev").css("height", "58px");
        $("#profile .owl-prev").css("background-color", "#2ca6d7");
        $("#profile .owl-prev").css("border-radius", "50px");
        $("#profile .owl-prev").css("color", "white");
        $("#profile .owl-prev").css("font-size", "30px");
        $("#profile .owl-prev").css("padding-top", "15px");
  
        $("#profile .owl-next").css("width", "58px");
        $("#profile .owl-next").css("height", "58px");
        $("#profile .owl-next").css("background-color", "#2ca6d7");
        $("#profile .owl-next").css("border-radius", "50px");
        $("#profile .owl-next").css("color", "white");
        $("#profile .owl-next").css("font-size", "30px");
        $("#profile .owl-next").css("padding-top", "15px");
      }
    },1)
    })
    // this.renderer.setAttribute(document.body, 'dir', this.directionController.textDirection);
    $(".drag-scroll-content").css("overflow", "hidden");
    // console.log(environment.language, "browserleng");
  //   if(environment.language == "IW"){
  //  this.currencySymbol="₪";

  //   }else{
  //     this.currencySymbol="€";
     
  //   }
    var t = Intl.DateTimeFormat().resolvedOptions().timeZone
    // console.log(t,"timeZone");
    if(t == "Asia/Jerusalem"){
      this.countryPhone=CountryISO.Israel;
      this.currencySymbol="₪";
    }else{
      this.countryPhone=CountryISO.India;
      this.currencySymbol="€";
    }
    // this.browserLang = navigator.language || navigator.language
    // if(this.browserLang == "he"){
    //   this.countryPhone=CountryISO.Israel;
    // }else{
    //   this.countryPhone=CountryISO.India;
    // }
    // var countryName =  fetch('https://api.ipregistry.co/?key=tryout')
    // .then(function (response) {
    //   console.log(response);
      
    //     return response.json();
    // })
    // .then(function (payload) {
    //   //  countryName = payload.location.country.name;
    //     // console.log(payload.location.country.name + ', ' + payload.location.city);
    //     return payload.location.country.name;
    // });
    // console.log(countryName ,"country");
    

  }
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
  customOptions1: OwlOptions = {
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
      }
    },
    nav: true
  }

  ngOnInit() {
    this.componentsService.currentMessage.subscribe(message => this.message = message)
 
    this.questionsForm = this.formBuilder.group({
      name: [""],
      email: [""],
      mobile: [""]
    });

this.getAllTeacherVideos()
    $("body").removeClass("body");
    $("body").removeClass("body");
    $("body").removeClass("body");
    $("body").removeClass("modal-open");
    $("body").removeAttr("style");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
   
    setTimeout(()=>{                           // <<<---using ()=> syntax
      $(".drag-scroll-content").css("overflow", "hidden");

      $("#profile .owl-prev").css("width", "58px");
      $("#profile .owl-prev").css("height", "58px");
      $("#profile .owl-prev").css("background-color", "#2ca6d7");
      $("#profile .owl-prev").css("border-radius", "50px");
      $("#profile .owl-prev").css("color", "white");
      $("#profile .owl-prev").css("font-size", "30px");
      $("#profile .owl-prev").css("padding-top", "15px");

      $("#profile .owl-next").css("width", "58px");
      $("#profile .owl-next").css("height", "58px");
      $("#profile .owl-next").css("background-color", "#2ca6d7");
      $("#profile .owl-next").css("border-radius", "50px");
      $("#profile .owl-next").css("color", "white");
      $("#profile .owl-next").css("font-size", "30px");
      $("#profile .owl-next").css("padding-top", "15px");



      
      // $("#owlcarousel .owl-stage").css("margin-top", "80px");
      $("#owlcarousel .owl-nav").css("position", "absolute");
      $("#owlcarousel .owl-nav").css("right", "0%");
      $("#owlcarousel .owl-nav").css("top", "-20%");
      $("#owlcarousel .owl-next").css("border-radius", "8px");


      $("#owlcarousel .owl-prev").css("border-radius", "8px");
      $("#owlcarousel .owl-prev").css("width", "58px");
      $("#owlcarousel .owl-prev").css("height", "58px");
      $("#owlcarousel .owl-prev").css("font-size", "30px");
      $("#owlcarousel .owl-prev").css("padding-top", "15px");
      $("#owlcarousel .owl-prev").css("background-color", "#2ca6d71a");
      $("#owlcarousel .owl-prev").css("background", "#2ca6d71a");
      $("#owlcarousel .owl-prev").css("color", "#2ca6d7");


      $("#owlcarousel .owl-next").css("border-radius", "8px");
      $("#owlcarousel .owl-next").css("width", "58px");
      $("#owlcarousel .owl-next").css("height", "58px");
      $("#owlcarousel .owl-next").css("font-size", "30px");
      $("#owlcarousel .owl-next").css("padding-top", "15px");
      $("#owlcarousel .owl-next").css("background-color", "#2ca6d71a");
      $("#owlcarousel .owl-next").css("background", "#2ca6d71a");
      $("#owlcarousel .owl-next").css("margin-right", "30px");
      $("#owlcarousel .owl-next").css("color", "#2ca6d7");
      $("#owlcarousel .owl-nav").removeClass("disabled");
      
      $("#owlcarousel .owl-next").hover(function(){
        $("owlcarousel .owl-next").css("background-color", "#2ca6d7");
        $("owlcarousel .owl-next").css("color", "white");
        }, function(){
          $("#owlcarousel .owl-next").css("background", "#2ca6d71a ");
          $("#owlcarousel .owl-next").css("color", "#2ca6d7");
      });
      


      $("#owlcarousel .owl-prev").hover(function(){
        $('#owlcarousel .owl-prev').css("background-color", "#2ca6d7");
        $("#owlcarousel .owl-prev").css("color", "white");
        }, function(){
          $("#owlcarousel .owl-prev").css("background", "#2ca6d71a");
          $("#owlcarousel .owl-prev").css("color", "#2ca6d7");
      });

      
      this.activeRoute.queryParams.subscribe((param:any) => {
          var element = document.getElementById(param["pageSec"]);
          if (element) {
              element.scrollIntoView();
          }
      })
      // width: 58px;
      // height: 58px;
      // display: -webkit-inline-box;
      // display: -ms-inline-flexbox;
      // display: inline-flex;
      // -webkit-box-align: center;
      // -ms-flex-align: center;
      // align-items: center;
      // -webkit-box-pack: center;
      // -ms-flex-pack: center;
      // justify-content: center;
      // background: rgb(44 166 215 / 10%) !important;
      // border-radius: 8px;
      // $(".owl-prev ").addClass("test");
  }, 1000);
    $(".modal-backdrop").remove();
// this.bookTheClass1();
    this.Last7Days(0);
    const toDayDate = new Date();
    this.selectdate = format(toDayDate, "EEEE d MMM");
    this.getPricing();
  }
  bookFirstLesson() {
    this.router.navigate(["/registration"]);
    $("body").removeAttr("style");
    $("body").removeClass("modal-open");
    $("body").addClass("body");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
  }
  bookTheClass(newDate1?: any) {
    this.styleExpPop="block";
  }
  selectDate(date: any) {
    const toDayDate = new Date(date);
    const newDate = format(toDayDate, "yyyy-MM-dd");

    this.bookTheClass(newDate);
  }

  ngAfterViewInit(): void {


  }
  bookTheClass1(newDate1?: any) {
    if (newDate1 != null) {
      this.latesDate = newDate1;
    } else {
      const toDayDate = new Date();
      this.latesDate = format(toDayDate, "yyyy-MM-dd");
    }
    const data = {
      date: this.latesDate,
      language: environment.language,
    };

    this.componentsService
      .getAllTeachersSloats(data)
      .subscribe((response: any) => {
        // this.submitted = false;
        $(".drag-scroll-content").css("overflow", "hidden");
        if (response.success === 1) {
          // this.notifier.notify('success', response.message)
          // this.dialogRef.close('SAVE');
        } else {
          // this.notifier.notify('error', response.message)
        }
      });
  }

  selectSlot(date: any) {
    this.selectdat = date;

    const data1 = this.allResponseModel.find(
      (item) => item.start_date === this.selectdat
    );
  }

  Last7Days(j: number) {
    this.result = [];
    const k = this.r + j;
    for (var i = 0; i < k; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      this.result.push(format(d, "EEEE d MMM"));
      format(d, "EEEE d MMM");
    }
    this.r = this.result.length;
  }

  chooseTime(time: any) {
    if (time == "Morning" || time == "Afternoon" || time == "Evening") {
      this.router.navigate(["/registration"]);
      $("body").removeAttr("style");
      $("body").removeClass("modal-open");
      $("body").addClass("body");
      $(".modal-backdrop ").removeClass("fade");
      $(".modal-backdrop ").removeClass("show");
      $(".modal-backdrop").remove();
    } else {
    }
  }
  popUpVideo(url:any,styleExp?:any){
    if(styleExp != "none"){
      this.styleExp="block";
    }

    let videoURL= 'https://www.youtube.com/embed/sugcZheBTww';
    // https://www.youtube.com/watch?v=TZdU19bORRY

    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=1');
    // this.videoURL = url + '?autoplay=1'
    // this.videoURL ="";
    // https://www.youtube.com/watch?v=sugcZheBTww

  }
  closePopUpVideo(){
    this.styleExp="none";
    this.styleExpPop="none";
    this.videoURL="this.videoURL";
    this.videoURL="";
    this.popUpVideo(this.videoURL,"none");
  }
  activate(Class: any) {
    let class1 = " ." + Class;

    $(".packagesec .row .col-lg-3")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(class1).addClass("active");
  }
  getPricing() {
    this.Loader=true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
    };
    this.componentsService.getPricing(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        this.pricingListed = response.response;
      } else {
      }
      this.Loader = false;
    });
  }
  onSubmit(){
    var  language=environment.language;
    this.mobileData = this.questionsForm.value.mobile;
    if (this.mobileData.dialCode  !=  undefined) {
      this.countryCode = this.mobileData.dialCode || null;
      this.mobile = this.mobileData.e164Number || null;
      
      // // substring(1)
      //  language= environment.language
    }
// var data = {
//   "data": [
//       {
//           "template_data": {
//               "to": this.mobile,
//               "template": {
//                   "name": "main_website_new_lead_from_2",
//                   "language": {
//                       "code": "he"
//                   },
//                   "components": [
//                       {
//                           "type": "body",
//                           "parameters": [
//                               {
//                                   "type": "text",
//                                   "text": this.questionsForm.value.name
//                               }
//                           ]
//                       }
//                   ]
//               }
//           },
//           "object_data": {
//               "createChildObject": true,
//               "SubStreamId": 0,
//               "ManagerId": 23669884,
//               "StatusId": 13,
//               "Content": {}
              
//           }
//       }
//   ]
// }
// data.data[0].template_data.to = this.mobile;
// data.data[0].template_data.template.language.code = language;
// data.data[0].template_data.template.components[0].parameters[0].text = this.questionsForm.value.name;

// console.log(data);

// let newData = data;

// var userId = localStorage.getItem("userid");
// var sessionId = localStorage.getItem("sessionId");
var language = "";
if(environment.language == 'IW'){
  language = "he";
}else{
  language = environment.language;
}

const commonData = {
  language: language,
  mobileNo:this.mobile,
  name:this.questionsForm.value.name,
  email:this.questionsForm.value.email,
};


    // deviceType
    if (!this.questionsForm?.invalid) {
      this.componentsService.sendWhatsAppMainWebsiteNewLeadFrom(commonData).subscribe((response: any) => {
        if (response.success === 1) {
          // this.userDetail = response.response;
          this.styleExpThanks = "block";
          this.questionsForm.reset();
          // this.router.navigate(["/login"]);
          // this.snackBar.open(response.description, "", { panelClass: "success" });
        } else {
          this.snackBar.open(response.description, "", { panelClass: ["error", this.directionController.textDirection] , direction:this.directionController.textDirection});
        }
      });
    
    }
  }
  closePopup(){
    this.styleExpThanks = "none";
  }
  getAllTeacherVideos() {
    this.Loader=true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const commonData = {
      language: environment.language,
    };
    this.componentsService.getAllTeacherVideos(commonData).subscribe((response: any) => {
      if (response.success === 1) {
        this.teacherVideos = response.response.videos;
        this.teacherReviews = response.response.reviews;
      } else {
      }
      this.Loader = false;
    });
  }
  myFunction() {
    var popup = document.getElementById("myPopup");
    popup!.classList.toggle("show");
    
    // if (popup?.paused){ 
    //     popup.play(); 
    //     }
    //   else{ 
    //     popup.pause();
    //     }
     
    }
}
