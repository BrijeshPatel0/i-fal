import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { AnalyticsComponent } from "../analytics/analytics.component";
import { ComponentsService } from "../components.service";
import { FindteacherComponent } from "../findteacher/findteacher.component";

@Component({
  selector: "app-i-fal-menu",
  templateUrl: "./i-fal-menu.component.html",
  styleUrls: ["./i-fal-menu.component.css"],
})
export class IFalMenuComponent implements OnInit {
  appointmentCount:any;
  class:any;
  public directionController = new TextDirectionController();
  constructor(private router: Router,private componentsService:ComponentsService) {
    this.router.events.subscribe((val: any) => {
      this.appointmentCount = localStorage.getItem("appointment_count");
    });
    this.componentsService.currentMessage.subscribe(message => this.directionController.textDirection = message)
  }

  ngOnInit() {

  }
  activate(Class: any) {
    let class1 = " ." + Class;
    $(".teachertab .test")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(class1).addClass("active");
  }

}
