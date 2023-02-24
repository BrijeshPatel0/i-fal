import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { Login2Component } from "./auth/login2/login2.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { Registration2Component } from "./auth/registration2/registration2.component";
import { AboutComponent } from "./components/about/about.component";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";
import { PreviousAttemptsComponent } from "./components/article-details/previous-attempts/previous-attempts.component";
import { ArticlesComponent } from "./components/articles/articles.component";
import { BookYourLessonComponent } from "./components/book-your-lesson/book-your-lesson.component";
import { BookLessionComponent } from "./components/findteacher/book-lession/book-lession.component";
import { FindteacherComponent } from "./components/findteacher/findteacher.component";
import { TeacherDetailComponent } from "./components/findteacher/teacher-detail/teacher-detail.component";
import { GrammarDetailsComponent } from "./components/grammar-details/grammar-details.component";
import { PreviousGrammarAttemptsComponent } from "./components/grammar-details/previous-grammar-attempts/previous-grammar-attempts.component";
import { GrammarComponent } from "./components/grammar/grammar.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { IFalMenuComponent } from "./components/i-fal-menu/i-fal-menu.component";
import { MembershipComponent } from "./components/membership/membership.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { NewhomepageComponent } from "./components/newhomepage/newhomepage.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { PracticeWordsComponent } from "./components/practice-words/practice-words.component";
import { SessionDetailComponent } from "./components/session-detail/session-detail.component";
import { SessionReportComponent } from "./components/session-report/session-report.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "registration2",
    component: Registration2Component,
  },
  {
    path: "findteacher",
    component: FindteacherComponent,
  },
  {
    path: "practice",
    component: PracticeWordsComponent,
  },
  {
    path: "setting",
    component: SettingsComponent,
  },
  {
    path: "book-lesson",
    component: BookYourLessonComponent,
  },
  {
    path: "i-fal-menu",
    component: IFalMenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: FindteacherComponent,
      },
      {
        path: "analytics",
        component: AnalyticsComponent,
      },
      {
        path: "sessions",
        component: SessionsComponent,
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
      },
      {
        path: "member",
        component: MembershipComponent,
      },
      {
        path: "practice",
        component: PracticeWordsComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "booklession",
        component: BookLessionComponent,
      },
      {
        path: "teacher-detail",
        component: TeacherDetailComponent,
      },
      {
        path: "session-detail",
        component: SessionDetailComponent,
      },
      {
        path: "payment",
        component: PaymentComponent,
      },
      {
        path: "session-report",
        component: SessionReportComponent,
      },
      {
        path: "articles",
        component: ArticlesComponent,
      },
      {
        path: "article-details",
        component: ArticleDetailsComponent,
      },
      {
        path: "previous-attempts",
        component: PreviousAttemptsComponent,
      },
      {
        path: "grammar",
        component: GrammarComponent,
      },
      {
        path: "grammar-details",
        component: GrammarDetailsComponent,
      },
      {
        path: "previous-grammar-attempts",
        component: PreviousGrammarAttemptsComponent,
      },
      
      
    ],
  },
  {
    path: "member",
    component: MembershipComponent,
  },
  {
    path: "my-profile",
    component: MyProfileComponent,
  },
  {
    path: "practice-words",
    component: PracticeWordsComponent,
  },
  {
    path: "sessions",
    component: SessionsComponent,
  },{
    path: "lp",
    component: NewhomepageComponent,
  },{
    path: "about",
    component: AboutComponent,
  },
  {
    path: "articles",
    component: ArticlesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
