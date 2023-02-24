import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { format } from "date-fns";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { responseModel, TeacherModel } from "../teacher.modal";

@Component({
  selector: "app-book-your-lesson",
  templateUrl: "./book-your-lesson.component.html",
  styleUrls: ["./book-your-lesson.component.css"],
})
export class BookYourLessonComponent implements OnInit {
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
  findTeacher:responseModel[] = [];
  seasons: string[] = ["Morning", "Afternoon", "Evening"];
  appointmentCount:any;
  Loader:boolean=true;

  constructor(
    private router: Router,
    private componentsService: ComponentsService // private icdCodeDialogModal: MatDialog,
  ) {
    this.appointmentCount = localStorage.getItem("appointment_count");
    // this.responseModel= new responseModel[]=[];
    
  }

  ngOnInit() {
    $(".modal-backdrop").remove();
    this.Last7Days(0);
    const toDayDate = new Date();
    this.selectdate = format(toDayDate, "EEEE d MMM");
    this.bookTheClass();
  }
  registration() {
    this.router.navigate(["/registration"]);
  }
  bookTheClass(newDate1?: any) {
    this.Loader=true;
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
    this.responseSlot = [];
    this.unicresponseSlot = [];
    this.componentsService
      .getAllTeachersSloats(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.teacherModel = response.teachers;
          this.allResponseModel = [];
          this.teacherModel.forEach((obj) => {
            this.responseModel = obj.response;
            this.responseModel!.forEach((obj1) => {
              this.responseData = new responseModel();
              this.responseData = obj1;
              this.responseData.start_date = format(
                new Date(new Date(obj1.start_date + " GMT+0300").toUTCString()),
                "yyyy-MM-dd HH:mm:ss"
              );
              this.responseData.teacherId = obj.id;
              this.allResponseModel.push(this.responseData);
            });
          });
          this.responseSlot = this.allResponseModel.filter((item) =>
            item.start_date?.includes(this.latesDate)
          );
          this.unicresponseSlot = this.responseSlot
            .map((item) => item.start_date)
            .filter((value, index, self) => self.indexOf(value) === index);
          this.unicresponseSlot.sort((a, b) => a.localeCompare(b));
          this.selectdat = "";
        } else {
        }
        this.Loader=false;
      });
  }
  selectDate(date: any) {
    const toDayDate = new Date(date);
    const newDate = format(toDayDate, "yyyy-MM-dd");

    this.bookTheClass(newDate);
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
    this.findTeacher = this.allResponseModel.filter((item) =>
    item.start_date?.includes(this.latesDate)
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

  bookFirstLesson() {
    this.router.navigate(["/registration"]);
    $("body").removeAttr("style");
    $("body").removeClass("modal-open");
    $("body").addClass("body");
    $(".modal-backdrop ").removeClass("fade");
    $(".modal-backdrop ").removeClass("show");
    $(".modal-backdrop").remove();
  }
}
