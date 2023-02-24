import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { TextDirectionController } from "src/app/service/TextDirectionController";
import { environment } from "src/environments/environment";
import { ComponentsService } from "../components.service";
import { SubscriptionModel } from "../teacher.modal";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  selected = "CreditCard";
  subscriptionForm!: FormGroup;
  subscriptionModel: SubscriptionModel | undefined;
  amount: number | undefined;
  frequency: any | undefined;
  paymentLink: any;
  Loader: boolean = true;
  submitted: boolean = false;
  termsOfUse: any;
  privacyPolicy: any;
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // this.componentsService.currentMessage.subscribe(message => this.directionController.textDirection = message)
    this.componentsService.currentMessage.subscribe(message => {
      this.directionController.textDirection = message
      if(this.directionController.textDirection == "rtl"){
        this.termsOfUse = environment.api_url + "/terms-of-use-hw";
        this.privacyPolicy = environment.api_url + "/privacy-policy-hw";
      }else{
        this.termsOfUse = environment.api_url + "/terms-of-use";
        this.privacyPolicy = environment.api_url + "/privacy-policy";
      }
    })
  }

  ngOnInit() {
    // $(".teachertab .test")
    // .addClass("active")
    // .siblings()
    // .removeClass("active");
  $(".MembershipMN").addClass("active");
    // environment.api_key;
    // this.termsOfUse = environment.api_url + "/terms-of-use";
    // this.privacyPolicy = environment.api_url + "/privacy-policy";
    this.activatedRoute.queryParams.subscribe((params) => {
      this.frequency = params["id"];
      this.frequency = this.componentsService.decrypt(this.frequency);
    });
    this.subscriptionForm = this.formBuilder.group({
      card_number: [this.subscriptionModel?.card_number, [Validators.required]],
      expiry_date: [this.subscriptionModel?.expiry_date, [Validators.required]],
      cvv: [this.subscriptionModel?.cvv, [Validators.required]],
      firstname: [this.subscriptionModel?.firstname, [Validators.required]],
      lastname: [this.subscriptionModel?.lastname, [Validators.required]],
      amount: [this.subscriptionModel?.amount],
      frequency: [this.subscriptionModel?.frequency],
      isSubscription: [this.subscriptionModel?.isSubscription,[Validators.required]],
      isAccept: [this.subscriptionModel?.isAccept,[Validators.required]],
    });
    this.Loader = false;
    // this.generatPaymentLink();
  }
  get firstname() {
    return this.subscriptionForm.get("firstname");
  }
  get card_number() {
    return this.subscriptionForm.get("card_number");
  }
  get expiry_date() {
    return this.subscriptionForm.get("expiry_date");
  }
  get cvv() {
    return this.subscriptionForm.get("cvv");
  }
  get lastname() {
    return this.subscriptionForm.get("lastname");
  }
  get isSubscription() {
    return this.subscriptionForm.get("isSubscription");
  }
  get isAccept() {
    return this.subscriptionForm.get("isAccept");
  }
  // get isSubscription() { return this.subscriptionForm.get('isSubscription'); }
  // get isAccept() { return this.subscriptionForm.get('isAccept'); }
  // onKeyDown(event: KeyboardEvent) {
  //   const input = event.target as HTMLInputElement;

  //   let trimmed = input.value.replace(/\s+/g, '');
  //   if (trimmed.length > 16) {
  //     trimmed = trimmed.substr(0, 16);
  //   }

  //   let numbers = [];
  //   for (let i = 0; i < trimmed.length; i += 4) {
  //     numbers.push(trimmed.substr(i, 4));
  //   }

  //   input.value = numbers.join(' ');

  // }

  onSubmit() {

    this.submitted = true;
    if (this.subscriptionForm.invalid) {
      // if(this.subscriptionForm.value.card_number.trim() == "" ||
      // this.subscriptionForm.value.expiry_date.trim() == "" ||
      // this.subscriptionForm.value.cvv.trim() == "" ||
      // this.subscriptionForm.value.firstname.trim() == "" ||
      // this.subscriptionForm.value.lastname.trim() == "" 
      // ){
      //   if(this.subscriptionForm.value.card_number.trim() == ""){
      //     this.subscriptionForm.controls['card_number'].reset();
      //   }
      //   if(this.subscriptionForm.value.expiry_date.trim() == ""){
      //     this.subscriptionForm.controls['expiry_date'].reset();
      //   }
      //   if(this.subscriptionForm.value.cvv.trim() == ""){
      //     this.subscriptionForm.controls['cvv'].reset();
      //   }
      //   if(this.subscriptionForm.value.firstname.trim() == ""){
      //     this.subscriptionForm.controls['firstname'].reset();
      //   }
      //   if(this.subscriptionForm.value.lastname.trim() == ""){
      //     this.subscriptionForm.controls['lastname'].reset();
      //   }
      // }
      if(this.subscriptionForm.value.isSubscription == null){
        this.subscriptionForm.controls['isSubscription'].reset();
      }
      if(this.subscriptionForm.value.isAccept == null){
        this.subscriptionForm.controls['isAccept'].reset();
      }
      this.submitted = true;
      return;
    }
    if(this.subscriptionForm.value.card_number.trim() == "" ||
    this.subscriptionForm.value.expiry_date.trim() == "" ||
    this.subscriptionForm.value.cvv.trim() == "" ||
    this.subscriptionForm.value.firstname.trim() == "" ||
    this.subscriptionForm.value.lastname.trim() == "" 
    ){
      if(this.subscriptionForm.value.card_number.trim() == ""){
        this.subscriptionForm.controls['card_number'].reset();
      }
      if(this.subscriptionForm.value.expiry_date.trim() == ""){
        this.subscriptionForm.controls['expiry_date'].reset();
      }
      if(this.subscriptionForm.value.cvv.trim() == ""){
        this.subscriptionForm.controls['cvv'].reset();
      }
      if(this.subscriptionForm.value.firstname.trim() == ""){
        this.subscriptionForm.controls['firstname'].reset();
      }
      if(this.subscriptionForm.value.lastname.trim() == ""){
        this.subscriptionForm.controls['lastname'].reset();
      }
      if(this.subscriptionForm.value.isSubscription.trim() == ""){
        this.subscriptionForm.controls['isSubscription'].reset();
      }
      if(this.subscriptionForm.value.isAccept.trim() == ""){
        this.subscriptionForm.controls['isAccept'].reset();
      }
      return;
     }

    if (!this.subscriptionForm.invalid) {
      this.Loader = true;
      this.submitted = false;
      // this.subscriptionForm.value.card_number =
      //   this.subscriptionForm.value.card_number.replace(/\s/g, "");
      var str = this.subscriptionForm.value?.expiry_date;
      var firstTwoChars = str.slice(0, 2);
      var lastTwoChars = str.slice(-2);

      // console.log(lastTwoChars+firstTwoChars);
      this.subscriptionModel = this.subscriptionForm.value;
      var userId = localStorage.getItem("userid");
      var sessionId = localStorage.getItem("sessionId");
      this.subscriptionModel!.sessionId = sessionId;
      this.subscriptionModel!.userId = userId;
      this.subscriptionModel!.firstname = this.subscriptionModel?.firstname;
      this.subscriptionModel!.lastname = this.subscriptionModel?.lastname;
      this.subscriptionModel!.card_number = this.subscriptionModel?.card_number;
      this.subscriptionModel!.cvv = this.subscriptionModel?.cvv;
      this.subscriptionModel!.expiry_date = lastTwoChars + firstTwoChars;
        this.subscriptionModel!.frequency = this.frequency;
      this.subscriptionModel!.language = environment.language;
      var form_data = new FormData();
      form_data.append("firstname", this.subscriptionModel!.firstname);
      form_data.append("lastname", this.subscriptionModel!.lastname);
      form_data.append("userId", this.subscriptionModel!.userId);
      form_data.append("sessionId", this.subscriptionModel!.sessionId);
      form_data.append("firstname", this.subscriptionModel!.firstname);
      form_data.append("cardNo", this.subscriptionModel!.card_number);
      form_data.append("CVV", this.subscriptionModel!.cvv);
      form_data.append("expDate", this.subscriptionModel!.expiry_date);
      form_data.append("frequency", this.subscriptionModel!.frequency);
      form_data.append("language", this.subscriptionModel!.language);
      form_data.append("deviceId", environment.deviceId);
      this.componentsService
        .addiCreditSubscription1(form_data)
        .subscribe((response: any) => {
          if (response.success === 1) {
            this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] , direction:this.directionController.textDirection });
            this.subscriptionForm.reset();
            this.router.navigate(["/i-fal-menu/member"], {
              queryParams: { paymentStatus: 'Done' },
            });
          } else {
            this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ] , direction:this.directionController.textDirection });
            // this.subscriptionForm.reset();
          }
          this.Loader = false;
        });
    }
  }

  generatPaymentLink() {
    this.Loader = true;
    var userId = localStorage.getItem("userid");
    var sessionId = localStorage.getItem("sessionId");
    const data = {
      language: environment.language,
      userId: userId,
      sessionId: sessionId,
      frequency: this.frequency,
      platform:"WEB",
    };
    this.componentsService
      .generatPaymentLink(data)
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.paymentLink = response.response.paymentLink;
          window.location.href = this.paymentLink;
          // this.router.navigate([this.paymentLink]);
          // this.snackBar.open(response.message, "", { panelClass: ["success" , this.directionController.textDirection ] });
        } else {
          this.snackBar.open(response.message, "", { panelClass: ["error" , this.directionController.textDirection ]  , direction:this.directionController.textDirection});
        }
        this.Loader = false;
      });
  }
}
