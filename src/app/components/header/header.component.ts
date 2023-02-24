import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextDirectionController } from 'src/app/service/TextDirectionController';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  language:any=[];
  languageName:any="English";
  languageImage:any="assets/images/us.svg";
  styleExp:any='none';
  isActive:boolean = false;
  appointmentCount:any;
  countryZone:any;
  message:any;
  brwserLang:any;
  landgPage:boolean = true;
  homePageHeader:boolean = true;
  public directionController = new TextDirectionController();
  constructor(public translateService: TranslateService, private componentsService: ComponentsService ,private router: Router) { 
    // this.router.events.subscribe((val: any) => {
    //   if (val.url != null) {
    //     this.modifyHeader(val);
    //   }
    // });

    this.router.events.subscribe((val: any) => {
      this.appointmentCount = localStorage.getItem("appointment_count");
    });
    this.componentsService.currentMessage.subscribe(message => {
      
      this.directionController.textDirection = message
      if(this.directionController.textDirection == "rtl"){
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        // this.selectLanguage('isr',this.languageName,this.languageImage)
      }else{
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        // this.selectLanguage('en',this.languageName,this.languageImage)
      }
    
    });
    var lang = localStorage.getItem('lang');
    this.brwserLang = navigator.language || navigator.language;
    this.countryZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if(lang != null){
      if(lang == "isr"){
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        this.selectLanguage(lang,this.languageName,this.languageImage)
      }else{
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        this.selectLanguage(lang,this.languageName,this.languageImage)
      }
    }else{
      if (this.countryZone == 'Asia/Jerusalem') {
        this.languageName = "עִברִית";
        this.languageImage = "assets/images/israel.svg";
        this.selectLanguage('isr',this.languageName,this.languageImage)
        localStorage.setItem('lang','isr');
      } else {
        this.languageName = "English";
        this.languageImage = "assets/images/us.svg";
        this.selectLanguage('en',this.languageName,this.languageImage)
        localStorage.setItem('lang','en');
      }
    }
  
  }

  ngOnInit() {
    this.componentsService.currentMessage.subscribe(message => this.message = message)
       setInterval(() => {
        this.modifyHeader();
      },100)

      this.router.url
      
  }
  
  selectLanguage(lang:any,languageName:any,languageImage:any){
    // console.warn('sssss');
    this.translateService.use(lang)
    localStorage.setItem('lang',lang);
    this.languageName = languageName;
    this.languageImage= languageImage;
    this.styleExp = "none";
    this.isActive=false;
    this.directionController = new TextDirectionController();
   this.reloadCurrentRoute();
    // window.location.reload();
  
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
  // if(currentUrl == "/i-fal-menu" || currentUrl == "/i-fal-menu/analytics"){
  //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.router.navigate([currentUrl]);
  //   });
  // }
    this.newMessage();
}
newMessage() {
  this.componentsService.changeMessage(this.directionController.textDirection)
}
homePage(){
  this.router.navigate(['']);


}
openClosePopup(isActive:any){
  this.isActive = !isActive
  if(this.isActive){
    this.styleExp = "block";
    this.isActive = true;
  }else{
    this.styleExp = "none";
  }
}
redirectHome(type:any){
  if(type == 'about'){
    this.router.navigate(["/about"]);
  }else if(type == 'login'){
    this.router.navigate(["/login"]);
  }
  else{
    this.router.navigate(["/"], { queryParams: {pageSec: type}});
  }
}
redirectHomeNew(type:any,e:any){
 
  if(type == 'about'){
    this.router.navigate(["/about"]);
  }else if(type == 'login'){
    this.router.navigate(["/login"]);
  }
  else{
    e.toggle()
    this.router.navigate(["/"], { queryParams: {pageSec: type}});
  }
}
modifyHeader() {
  // This method is called many times
  this.router.url
  if (location.pathname === "/lp") {
    this.landgPage= false;
  } else {
    this.landgPage = true;
  }
  if (
    this.router.url === "/" || 
    this.router.url === "/?pageSec=Why_ifal" || 
    this.router.url === "/?pageSec=Pricing" || 
    this.router.url === "/?pageSec=Our_Teachers" || 
    this.router.url === "/?pageSec=FAQs" || 
    this.router.url === "/?pageSec=contact" ||
    this.router.url === "/about" 
  ) {
    this.homePageHeader= false;
  } else {
    this.homePageHeader = true;
  }
}
}
