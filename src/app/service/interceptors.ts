import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { catchError, finalize, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComponentsService } from "../components/components.service";
import { SocialAuthService } from "angularx-social-login";
@Injectable({
  providedIn: "root",
})
export class LoginInterceptor implements HttpInterceptor {
  direction: any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private componentsService: ComponentsService,
    private authServiceSocial: SocialAuthService
  ) {
    this.componentsService.currentMessage.subscribe((message) => {
      this.direction = message;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.modifyBody(event.body) });
        }
        return event;
      })
    );
  }
  private modifyBody(body: any) {
    // console.log(body);
    if (body.success == 4) {
      this.router.navigate(["/login"]);
      var newdate = localStorage.getItem("AppSettingsDate");
      var support_link = localStorage.getItem("support_link");
      let language = localStorage.getItem("lang");
      localStorage.clear();
      localStorage.setItem("AppSettingsDate", newdate!);
      localStorage.setItem("support_link", support_link!);
      localStorage.setItem("lang", language!);
      this.authServiceSocial.signOut();
      this.router.navigate(["/"]);
      if (this.direction == "ltr") {
        this.snackBar.open("Logged out", "", {
          panelClass: ["success", this.direction],
          direction: this.direction,
        });
      } else {
        this.snackBar.open("התנתק", "", {
          panelClass: ["success", this.direction],
          direction: this.direction,
        });
      }
    }
  }
}
