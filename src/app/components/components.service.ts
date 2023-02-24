import { Injectable } from "@angular/core";
import { format } from "date-fns";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CommonService } from "../service/common.service";
import * as CryptoTS from "crypto-ts";
import * as moment from "moment";

@Injectable()
export class ComponentsService {
  private messageSource = new BehaviorSubject("ltr");
  currentMessage = this.messageSource.asObservable();
  private getAllTeachersSloatsURL = "apis/getAllTeachersSloats";
  private userSignUpURL = "apis/userSignUp1";
  private bookAppointmentURL = "apis/bookAppointment1";
  private addSlotToTempBookedSlotURL = "apis/addSlotToTempBookedSlot";
  private findAllTeacherURL = "apis/allTeachers";
  private getSingleTeacherDetailsURL = "apis/singleTeacherDetails";
  private getTeacherRatingsURL = "apis/getTeacherRatings";
  private getTeachersloteURL = "apis/getAllSloats";
  private upcommingAppointmentForUserURL = "apis/upcommingAppointmentForUser1";
  private pastAppointmentForUserURL = "apis/pastAppointmentForUser1";
  private getSingleAppointmentDetailsURL = "apis/getSingleAppointmentDetails";
  private getProfileURL = "apis/getProfile";
  private updateProfileURL = "apis/updateProfile";
  private cancelAppointmentURL = "apis/cancelAppointment";
  private userVerificationURL = "apis/userVerification";
  private deleteUserURL = "apis/deleteUser";
  private userLogoutURL = "apis/userLogout";
  private getPricingURL = "apis/getPricing";
  private addiCreditSubscription1URL = "apis/addiCreditSubscription1";
  private generatPaymentLinkURL = "apis/generatPaymentLink1";
  private addFavouriteWordURL = "apis/addFavouriteWord1";
  private getAllFavouriteWordURL = "apis/getAllFavouriteWord";
  private deleteFavouriteWordURL = "apis/deleteFavouriteWord";
  private canceliCreditSubscriptionURL = "apis/canceliCreditSubscription";
  private getStudentSummaryURL = "apis/getStudentSummary";
  private rescheduleAppointmentURL = "apis/rescheduleAppointment1";
  private reSendOTPURL = "apis/reSendOTP";
  private changePasswordURL = "apis/changePassword";
  private getAllTeacherVideosURL = "apis/getAllTeacherVideos";
  private questionsSubmitURL =
    "https://api.commbox.io/v2/whatsapp/sendtemplatedmessage/ByUAFT1s7Se_fa2426GhfTg%3d%3d";
  private getAllTeachersSloatsFromCronURL = "apis/getAllTeachersSloatsFromCron";
  private sendWhatsAppMainWebsiteNewLeadFromURL =
    "apis/sendWhatsAppMainWebsiteNewLeadFrom";
  private getAppSettingsURL = "apis/getAppSettings";
  private sendCrashDataURL = "apis/sendCrashData";
  private hearAboutiFalURL = "apis/hearAboutiFal";
  private setReminderSettingsURL = "apis/setReminderSettings";
  private getReminderSettingsURL = "apis/getReminderSettings";
  private addCommentURL = "apis/addComment";
  private updateSessionSettingsURL = "apis/updateSessionSettings";
  private getArticlesURL = "apis/getArticles";
  private getArticleDetailsURL = "apis/getArticleDetails";
  private submitAttemptURL = "apis/submitAttempt";
  private getAttemptsURL = "apis/getAttempts";
  private getAllGrammarsURL = "apis/getAllGrammars";
  private getGrammarDetailsURL = "apis/getGrammarDetails";
  private submitGrammarAttemptURL = "apis/submitGrammarAttempt";
  private getGrammarAttemptsURL = "apis/getGrammarAttempts";

  constructor(private commonService: CommonService) {}
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  isValidFileType(fileName: any, fileType: any): boolean {
    // Create an object for all extension lists
    let extentionLists: any = {
      video: [],
      image: [],
      pdf: [],
      excel: [],
      xml: [],
      csv: [],
    };
    let isValidType = false;
    extentionLists.video = ["m4v", "avi", "mpg", "mp4"];
    extentionLists.image = ["jpg", "jpeg", "bmp", "png", "ico"];
    extentionLists.pdf = ["pdf"];
    extentionLists.excel = ["excel"];
    extentionLists.xml = ["xml"];
    extentionLists.csv = ["csv", "xlsx"];
    //get the extension of the selected file.
    let fileExtension = fileName.split(".").pop().toLowerCase();
    isValidType = extentionLists[fileType].indexOf(fileExtension) > -1;
    return isValidType;
  }
  getAllTeachersSloats(modalData: any) {
    return this.commonService.post(this.getAllTeachersSloatsURL, modalData);
  }
  getAllTeachersSloatsFromCron(modalData: any) {
    return this.commonService.post(
      this.getAllTeachersSloatsFromCronURL,
      modalData
    );
  }

  userSignUp(modalData: any) {
    return this.commonService.post(this.userSignUpURL, modalData);
  }
  questionsSubmit(modalData: any) {
    return this.commonService.postExter(this.questionsSubmitURL, modalData);
  }
  sendWhatsAppMainWebsiteNewLeadFrom(modalData: any) {
    return this.commonService.post(
      this.sendWhatsAppMainWebsiteNewLeadFromURL,
      modalData
    );
  }
  getAllTeachersSloats1(modalData: any) {
    // return this.commonService.getAll(this.getAllTeachersSloatsURL, modalData);
  }
  bookAppointment(modalData: any) {
    return this.commonService.post(this.bookAppointmentURL, modalData);
  }
  addSlotToTempBookedSlot(modalData: any) {
    return this.commonService.post(this.addSlotToTempBookedSlotURL, modalData);
  }
  rescheduleAppointment(modalData: any) {
    return this.commonService.post(this.rescheduleAppointmentURL, modalData);
  }
  findAllTeacher(commonData: any) {
    return this.commonService.post(this.findAllTeacherURL, commonData);
  }
  getSingleTeacherDetails(commonData: any) {
    return this.commonService.post(this.getSingleTeacherDetailsURL, commonData);
  }
  getTeacherRatings(commonData: any) {
    return this.commonService.post(this.getTeacherRatingsURL, commonData);
  }
  getTeacherslote(commonData: any) {
    return this.commonService.post(this.getTeachersloteURL, commonData);
  }
  upcommingAppointmentForUser(commonData: any) {
    return this.commonService.post(
      this.upcommingAppointmentForUserURL,
      commonData
    );
  }
  pastAppointmentForUser(commonData: any) {
    return this.commonService.post(this.pastAppointmentForUserURL, commonData);
  }
  getSingleAppointmentDetails(commonData: any) {
    return this.commonService.post(
      this.getSingleAppointmentDetailsURL,
      commonData
    );
  }
  getProfile(commonData: any) {
    return this.commonService.post(this.getProfileURL, commonData);
  }
  updateProfile(commonData: any) {
    return this.commonService.post(this.updateProfileURL, commonData);
  }
  changePassword(commonData: any) {
    return this.commonService.post(this.changePasswordURL, commonData);
  }
  cancelAppointment(commonData: any) {
    return this.commonService.post(this.cancelAppointmentURL, commonData);
  }
  userVerification(commonData: any) {
    return this.commonService.post(this.userVerificationURL, commonData);
  }
  deleteUser(commonData: any) {
    return this.commonService.post(this.deleteUserURL, commonData);
  }
  reSendOTP(commonData: any) {
    return this.commonService.post(this.reSendOTPURL, commonData);
  }
  userLogout(commonData: any) {
    return this.commonService.post(this.userLogoutURL, commonData);
  }
  getPricing(commonData: any) {
    return this.commonService.post(this.getPricingURL, commonData);
  }
  getAllTeacherVideos(commonData: any) {
    return this.commonService.post(this.getAllTeacherVideosURL, commonData);
  }
  addiCreditSubscription1(commonData: any) {
    return this.commonService.post(this.addiCreditSubscription1URL, commonData);
  }
  generatPaymentLink(commonData: any) {
    return this.commonService.post(this.generatPaymentLinkURL, commonData);
  }
  addFavouriteWord(commonData: any) {
    return this.commonService.post(this.addFavouriteWordURL, commonData);
  }
  getAllFavouriteWord(commonData: any) {
    return this.commonService.post(this.getAllFavouriteWordURL, commonData);
  }
  deleteFavouriteWord(commonData: any) {
    return this.commonService.post(this.deleteFavouriteWordURL, commonData);
  }
  canceliCreditSubscription(commonData: any) {
    return this.commonService.post(
      this.canceliCreditSubscriptionURL,
      commonData
    );
  }
  getStudentSummary(commonData: any) {
    return this.commonService.post(this.getStudentSummaryURL, commonData);
  }
  getAppSettings(commonData: any) {
    return this.commonService.post(this.getAppSettingsURL, commonData);
  }
  hearAboutiFal(commonData: any) {
    return this.commonService.post(this.hearAboutiFalURL, commonData);
  }
  setReminderSettings(commonData: any) {
    return this.commonService.post(this.setReminderSettingsURL, commonData);
  }
  getReminderSettings(commonData: any) {
    return this.commonService.post(this.getReminderSettingsURL, commonData);
  }
  addComment(commonData: any) {
    return this.commonService.post(this.addCommentURL, commonData);
  }
  updateSessionSettings(commonData: any) {
    return this.commonService.post(this.updateSessionSettingsURL, commonData);
  }
  getArticles(commonData: any) {
    return this.commonService.post(this.getArticlesURL, commonData);
  }
  getArticleDetails(commonData: any) {
    return this.commonService.post(this.getArticleDetailsURL, commonData);
  }
  submitAttempt(commonData: any) {
    return this.commonService.post(this.submitAttemptURL, commonData);
  }
  getAttempts(commonData: any) {
    return this.commonService.post(this.getAttemptsURL, commonData);
  }


  getAllGrammars(commonData: any) {
    return this.commonService.post(this.getAllGrammarsURL, commonData);
  }
  getGrammarDetails(commonData: any) {
    return this.commonService.post(this.getGrammarDetailsURL, commonData);
  }
  submitGrammarAttempt(commonData: any) {
    return this.commonService.post(this.submitGrammarAttemptURL, commonData);
  }
  getGrammarAttempts(commonData: any) {
    return this.commonService.post(this.getGrammarAttemptsURL, commonData);
  }

  // sendCrashData(commonData: any) {
  //   return this.commonService.post(this.sendCrashDataURL, commonData);
  // }

  // isrealToOtherContryDate1(isrealDate: any) {

  //   const OtherDate = format(
  //     new Date(new Date(isrealDate + " GMT+0300  (GMT)").toUTCString()),
  //     "EEE MMM dd yyyy HH:mm:ss"
  //   );
  //   return OtherDate;

  // }

  isrealToOtherContryDate(isrealDate: any) {
    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate = "";
    var OtherDate1 = "";
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      OtherDate = format(
        new Date(new Date(isrealDate + " GMT+0300").toUTCString()),
        "EEE MMM dd yyyy HH:mm:ss"
      );
    } else {
      OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");

      OtherDate = format(
        new Date(new Date(OtherDate1 + " GMT+0200").toUTCString()),
        "EEE MMM dd yyyy HH:mm:ss"
      );
    }

    return OtherDate;
  }
  isrealToOtherContryNewDate(isrealDate: any) {
    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate = "";
    var OtherDate1 = "";
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      OtherDate = format(
        new Date(new Date(isrealDate + " GMT+0300").toUTCString()),
        "yyyy-MM-dd"
      );
    } else {
      OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");
      OtherDate = format(
        // new Date(new Date(OtherDate1 + " GMT+0200").toUTCString()),
        new Date(new Date(OtherDate1 + " GMT+0200").toUTCString()),
        "yyyy-MM-dd"
      );
    }
    return OtherDate;
  }
  otherContryDateToIsrealDate(otherContryDate: string) {
    const isrealDate = new Date(otherContryDate).toLocaleString("sv-SE", {
      timeZone: "asia/Jerusalem",
    });
    return isrealDate;
  }
  isrealToOtherContryTime(isrealDate: any) {
    // const OtherDate = new Date(
    //   new Date(isrealDate + " GMT+0300").toUTCString()
    // );
    // return OtherDate;

    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate;
    var OtherDate1;
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      OtherDate = new Date(new Date(isrealDate + " GMT+0300").toUTCString());
    } else {
      OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");
      OtherDate = new Date(new Date(OtherDate1 + " GMT+0200").toUTCString());
    }
    // replace(/-/g, "/")
    return OtherDate;
  }
  encrypt(obj: any) {
    //encrypt
    var ciphertext = CryptoTS.AES.encrypt(obj.toString(), "secret key 123");
    // console.log(ciphertext.toString(),"E");

    return ciphertext;
  }

  decrypt(obj: any) {
    // Decrypt
    var bytes = CryptoTS.AES.decrypt(obj.toString(), "secret key 123");
    var plaintext = bytes.toString(CryptoTS.enc.Utf8);
    // console.log(plaintext, "D");
    return plaintext;
  }

  // encryptValue(value: any, isEncrypt: boolean = true): any {
  //    let response: any;
  //    if (value != null && value != '') {
  //      let pwd = "HCPRODUCT#!_2018@";
  //      let bytes: any;
  //      if (isEncrypt) {
  //        bytes = utf8.encode(value.toString());
  //        response = base64.encode(bytes);
  //        //response = CryptoJS.AES.encrypt(JSON.stringify(value), pwd);
  //      }
  //      else {
  //        bytes = base64.decode(value);
  //        response = utf8.decode(bytes);
  //        // const bytes = CryptoJS.AES.decrypt(value, pwd);
  //        // if (bytes.toString()) {
  //        //   response= JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //        // }
  //        //      response = CryptoJS.AES.decrypt(value, pwd);//.toString(CryptoJS.enc.Utf8);
  //      }
  //    }
  //    return response;
  //  }

  isrealToOtherContryDate1(isrealDate: any) {
    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate = "";
    var OtherDate1 = "";
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      var t = moment(isrealDate).zone("+0300").format("YYYY-MM-DD HH:mm");
      OtherDate = moment(new Date(new Date(t).toUTCString())).format(
        "YYYY-MM-DD HH:mm"
      );
    } else {
      // OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");
      var t = moment(isrealDate).utcOffset("+02:00").format("YYYY-MM-DD HH:mm");
      OtherDate = moment(new Date(t).toUTCString()).format("YYYY-MM-DD HH:mm");
    }

    return OtherDate;
  }
  isrealToOtherContryNewDate1(isrealDate: any) {
    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate = "";
    var OtherDate1 = "";
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      var t = moment(isrealDate).zone("+0300").format("YYYY-MM-DD HH:mm");
      OtherDate = moment(new Date(new Date(t).toUTCString())).format(
        "YYYY-MM-DD"
      );
    } else {
      // OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");
      var t = moment(isrealDate).zone("+0200").format("YYYY-MM-DD HH:mm");
      OtherDate = moment(new Date(new Date(t).toUTCString())).format(
        "YYYY-MM-DD"
      );
    }
    return OtherDate;
  }
  otherContryDateToIsrealDate1(otherContryDate: string) {
    const isrealDate = new Date(otherContryDate).toLocaleString("sv-SE", {
      timeZone: "asia/Jerusalem",
    });
    return isrealDate;
  }
  isrealToOtherContryTime1(isrealDate: any) {
    // const OtherDate = new Date(
    //   new Date(isrealDate + " GMT+0300").toUTCString()
    // );
    // return OtherDate;

    var d = new Date();
    var curr_year = d.getFullYear();
    var zoneStarDay = new Date(
      curr_year + "-" + "03" + "-" + "25" + " 02:00"
    ).getTime();
    var zoneEndDay = new Date(
      curr_year + "-" + "10" + "-" + "30" + " 02:00"
    ).getTime();
    var newDay = new Date(isrealDate).getTime();
    var OtherDate;
    var OtherDate1;
    if (zoneStarDay < newDay && zoneEndDay > newDay) {
      var t = moment(isrealDate).zone("+0300").format("YYYY-MM-DD HH:mm");
      OtherDate = new Date(new Date(t).toUTCString());
    } else {
      // OtherDate1 = format(new Date(isrealDate), "EEE MMM dd yyyy HH:mm:ss");
      var t = moment(isrealDate).zone("+0200").format("YYYY-MM-DD HH:mm");
      OtherDate = new Date(new Date(t).toUTCString());
    }
    // replace(/-/g, "/")
    return OtherDate;
  }
  utcToLocal(date1: any) {
    var OtherDate;
    let datestring = "01-10-2022 06:50:05";
    let date = date1.split(" ");
    let dateDate = date[0].split("-");
    var NewDate =
      dateDate[2] + "-" + dateDate[1] + "-" + dateDate[0] + " " + date[1];
    

    var current1 = new Date(NewDate + " UTC");
    OtherDate = format(
          new Date(new Date(NewDate + ' UTC')),
          "yyyy-MM-dd HH:mm:ss"
        );
    return OtherDate;
  }
}
