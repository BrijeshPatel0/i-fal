import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { Login2Component } from "./auth/login2/login2.component";
import { Registration2Component } from "./auth/registration2/registration2.component";
import { BookYourLessonComponent } from "./components/book-your-lesson/book-your-lesson.component";
import { FindteacherComponent } from "./components/findteacher/findteacher.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderAfterLoginComponent } from "./components/header-after-login/header-after-login.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { IFalMenuComponent } from "./components/i-fal-menu/i-fal-menu.component";
import { PracticeWordsComponent } from "./components/practice-words/practice-words.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
import { MembershipComponent } from "./components/membership/membership.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { BookLessionComponent } from "./components/findteacher/book-lession/book-lession.component";
import { TeacherDetailComponent } from "./components/findteacher/teacher-detail/teacher-detail.component";
import { SessionDetailComponent } from "./components/session-detail/session-detail.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatSelectModule } from "@angular/material/select";
import { PaymentComponent } from "./components/payment/payment.component";
import { CommonService } from "./service/common.service";
import { ComponentsService } from "./components/components.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { MatRadioModule } from "@angular/material/radio";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { DragScrollModule } from "ngx-drag-scroll";
import { NgOtpInputModule } from "ng-otp-input";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SessionReportComponent } from "./components/session-report/session-report.component";
import { NumberTrackerComponent } from "./components/findteacher/number-tracker.component";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import { CarouselModule } from "ngx-owl-carousel-o";
import { NewhomepageComponent } from "./components/newhomepage/newhomepage.component";
import { BidiModule } from "@angular/cdk/bidi";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RegistrationComponent } from "./auth/registration/registration.component";
import { AccountService } from "./service/Account.service";
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";
import { AboutComponent } from "./components/about/about.component";
import { NgxCaptchaModule } from "ngx-captcha";
import {NgxMaskModule, IConfig} from 'ngx-mask'
import { SafePipe } from "./components/findteacher/teacher-detail/safe.pipe";
import { LoginInterceptor } from "./service/interceptors";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { ArticlesComponent } from "./components/articles/articles.component";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";
import { SafeHtmlPipe } from "./pipe/safeHtml.pipe";
import { PreviousAttemptsComponent } from "./components/article-details/previous-attempts/previous-attempts.component";
import { TimeAgoPipe } from "./pipe/timeAgo.pipe";
import { GrammarComponent } from "./components/grammar/grammar.component";
import { GrammarDetailsComponent } from "./components/grammar-details/grammar-details.component";
import { PreviousGrammarAttemptsComponent } from "./components/grammar-details/previous-grammar-attempts/previous-grammar-attempts.component";
import {MatMenuModule} from '@angular/material/menu';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export const options: Partial<IConfig> = {
  thousandSeparator: "'"
};
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    FindteacherComponent,
    HeaderAfterLoginComponent,
    PracticeWordsComponent,
    SettingsComponent,
    Login2Component,
    Registration2Component,
    BookYourLessonComponent,
    IFalMenuComponent,
    AnalyticsComponent,
    MembershipComponent,
    MyProfileComponent,
    SessionsComponent,
    BookLessionComponent,
    TeacherDetailComponent,
    SessionDetailComponent,
    PaymentComponent,
    SessionReportComponent,
    NumberTrackerComponent,
    NewhomepageComponent,
    AboutComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    SafePipe,
    SafeHtmlPipe,
    TimeAgoPipe,
    PreviousAttemptsComponent,
    GrammarComponent,
    GrammarDetailsComponent,
    PreviousGrammarAttemptsComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    MatPaginatorModule,
    NgxPaginationModule,
    DragScrollModule,
    MatSnackBarModule,
    BidiModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,  
    MatProgressSpinnerModule,
    NgxCaptchaModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: "en",
    }),
    MatSelectModule,
    MatRadioModule,
    NgOtpInputModule,
    NgCircleProgressModule.forRoot({}),
    MatExpansionModule,
    CarouselModule,
    MatMenuModule
  ],
  providers: [
    CommonService,
    AccountService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "51971131325-b7tcrpbgs1kppuhfojmb4ptuktf34m3v.apps.googleusercontent.com"
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("2531866757035697")
          }
        ]
      } as SocialAuthServiceConfig
    },
    SocialAuthService,
    ComponentsService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: "bottom",
        horizontalPosition: "center",
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
