import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { filter } from "rxjs";
import { environment } from "src/environments/environment";
import { ComponentsService } from "./components/components.service";
import { TextDirectionController } from "./service/TextDirectionController";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "i-fal";
  showHeader = true;
  landgPage=true;
  browserLang:any;
  textDirection:any;
  public directionController = new TextDirectionController();
  constructor(private router: Router,private titleService: Title,    private componentsService: ComponentsService,   private changeDetector: ChangeDetectorRef,    public translateService: TranslateService,) {
    this.router.events.subscribe((val: any) => {
      if (val.url != null) {
        this.modifyHeader(val);
      }
      window.scrollTo(0, 0);
    });
    this.componentsService.currentMessage.subscribe((message:any) => {
      this.directionController.textDirection = message
      if(this.directionController.textDirection == 'ltr'){
        this.titleService.setTitle("Ifal - English one-on-one classes for $6 | Free trial class");  
  
      }else{
        this.titleService.setTitle("i-fal | שיעורים פרטיים באנגלית ב 20 ₪ | שיעור ניסיון חינם | מהפכת הלואו קוסט ");  
      }
    })
  }
  ngOnInit() {

    if(localStorage.getItem('deviceId') == null){
      environment.deviceId =  this.genUniqueId();
      localStorage.setItem('deviceId',environment.deviceId);
    }else{
      environment.deviceId = localStorage.getItem('deviceId') || "";
    }

    this.changeDetector.detectChanges();
    
    // this.browserLang = navigator.language || navigator.language
    // this.browserLang = localStorage.getItem("lang");
    // // if(this.browserLang == "he" || this.browserLang == "rtl"){
    //   if(this.browserLang == "isr"){
    //   this.translateService.setDefaultLang('isr');
    //   this.textDirection= 'rtl';   
    //   localStorage.setItem('lang','isr');
    //   localStorage.setItem("language","IW");
    //   environment.language ="IW";
    // }else{
    //   this.translateService.setDefaultLang('en');
    //   localStorage.setItem('lang','en');
    //   this.textDirection= 'ltr';
    //   localStorage.setItem("language","EN");
    //   environment.language ="EN";
    // }
  }

  modifyHeader(location: any) {
    // This method is called many times
    // if (location.url === "/registration" || location.url === "/login" || location.url === "/about" || location.url === "/lp") {
      if (location.url === "/registration" || location.url === "/login" || location.url === "/lp") {
      this.showHeader = false;
      this.landgPage= false;
    } else {
      this.showHeader = true;
      this.landgPage= true;
    }
    if (location.url === "/lp") {
      this.landgPage= true;
    } else {
      this.landgPage= false;
    }
  }
  genUniqueId() {
    const dateStr = Date.now().toString(36); // convert num to base 36 and stringify
    const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point
    return `${dateStr}-${randomStr}`;
  }
}
