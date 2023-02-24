import { LastmonthScoreModel } from "./findteacher/teacher-modal";

export class TeacherModel {
  id?: number;
  first_name?: string;
  last_name?: string;
  teacher_ratings?: number;
  total_ratings?: number;
  last_seven_days_total_ratings?: number;
  thumbnail?: string;
  trial_lesson_status?:any;
  response?: responseModel[];
  data?: dataModel[];
}

export class responseModel {
  id?: number;
  isBooked?: number;
  start_date: string | undefined;
  teacherId?: number;
  startTimeNumber?:number;
  isAlready?:number;
}
export class dataModel {
  break_start_time?: string;
  break_end_time?: string;
}
export class slotModel {
  id?: number;
  slot?: string;
}
export class dataModeltest {
  startDate?: string;
  endDate?: string;
}

export class bookAppoinmentModel {
  date?: string;
  sloatId?: string;
  startTime?: string;
  teacherId?: number;
}
export class SessionsModel {
  id?: number;
  user_id?: number;
  teacher_id?: string;
  appointment_date?: string;
  appointment_status?: string;
  payment_status?: string;
  total_amount?: string;
  created_at?: string;
  is_free_session?: string;
  is_free_session_assign_by_admin?: string;
  is_free_recurring_session?: string;
  appointment_details?: appointment_detailsModel[];
  user_data?: user_dataModel;
  teacher_data?: teacher_dataModel;
  appointmentId?: number;
  startAppointmentDate?: string;
  endAppointmentDate?: string;
  sloat_id?:string;
}

export class appointment_detailsModel {
  id?: number;
  sloat_id?: string;
  appointment_id?: string;
  from?: string;
  to?: string;
}
export class user_dataModel {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  thumbnail?: string;
}
export class teacher_dataModel {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  gender?: string;
  teacher_date?: string;
  thumbnail?: string;
}

export class UserAppointmentDetailsModel {
  id?: number;
  user_id?: string;
  teacher_id?: string;
  appointment_date?: string;
  appointment_status?: string;
  payment_status?: string;
  total_amount?: string;
  created_at?: string;
  is_free_session?: string;
  is_free_session_assign_by_admin?: string;
  is_free_recurring_session?: string;
  rating?: string;
  review?: string;
  appointment_details?: any;
  meatingId?: number;
  meating_password?: string;
  zoom_start_url?: string;
  zoom_join_url?: string;
  user_data?: any;
  teacher_data?: any;
  report?: any;
  summary?: any;
}

export class ProfileModel {
  id?: any;
  first_name?: any;
  last_name?: any;
  password?: any;
  totalRecords?: number;
  deviceType?: any = "WEB";
  loginType?: any = "NORMAL";
  alternate_email?: any;
  thumbnail?: any;
  user_type?: any;
  login_type?: any;
  gender?: any;
  sloatId?: any;
  is_whatsapp_notification_on?: any;
  is_email_notification_on?: any;
  session_settings?: any;
  appointment_count?: any;
  last_appointment_id?: any;
  payment_date?: any;
  package_valid_for?: any;
  paymentType?: any;
  subscription_exp_date?: any;
  is_subscription_active?: any;
  frequncy?: any = '';
  has_heard?: any;
  one_time_free_remaining_sessions?: any = '0';
  recurring_free_remaining_sessions?: any = '0';
  is_verified?: any;
  is_active?: any;
  is_deleted?: any;
  isNewUser?: any;
  isPhoneVerified?: any;
  created_at?: any;
  sessionId?: any;
  isInAppDisabled?: number;
  userId?: any;
  firstname?: any;
  lastname?: any;
  email?: any;
  country_code?: any;
  mobile?: any;
  profileImage?: any;
  alternateEmail?: any;
  language?: any;
  total_sessions: any;
  remaining_sessions: any;
  next_month_total_sessions: any;
  next_month_remaining_sessions: any;
  score?: ScoreModel;
}
export class SubscriptionModel {
  card_number?: any;
  expiry_date?: any;
  cvv?: any;
  firstname?: any;
  lastname?: any;
  amount?: any;
  frequency?: any;
  isSubscription?: boolean = false;
  isAccept?: boolean = false;
  language?: any;
  userId?: any;
  sessionId?: any;
}

export class PracticeWordsModel {
  id: any;
  english?: any;
  hebrew?: any;
  spanish?: any;
  sentence?: any;
  is_from_app?:any;
}
export class ScoreModel {
  months?: monthsModel[];
  lastMonth?: LastmonthScoreModel;
}
export class monthsModel {
  month?: any;
  total_score?: any;
  level_name?: any;
}
export class NotificationModel {
  mail_session_confirmation: any=false;
  mail_session_report: any=false;
  language?: any;
  userId?: any;
  sessionId?: any;
}

export class RemindersModel {
  whatsapp_3_hours:any = false;
  whatsapp_30_minutes:any = false;
  whatsapp_5_minutes:any = false;
  mail_10_minutes:any = false;
  ivr_2_5_minutes:any = false;
  whatsapp:any
  language?: any;
  userId?: any;
  sessionId?: any;
}

export class NotesModel {
  notes1:any = false;
  notes2:any = false;
  notes3:any = false;
  notes4:any = false;
  notes5:any = "";
}

export class ArticlesModel {
  artical_category?:any;
  artical_image?:any;
  artical_name?:any;
  created_at?:any;
  google_drive_link?:any;
  id?:Number;
  is_submitted?:any;
  lession_link?:any;
  type?:any;
}

export class ArticlesDetailsModel {
  id?:any;
  artical_name?:any;
  type?:any;
  artical_category?:any;
  artical_image?:any;
  google_drive_link?:Number;
  created_at?:any;
  artical_description?:any;
  is_add_words_to_practice_words?:any;
  vocabulary_details?:VocabularyDetailsModel[];
  reading_comprehension?:ReadingComprehensionModel[];
  further_discussion?:any[];  
}
export class ReadingComprehensionModel {
  question?:any;
  answer?:any;
  options?:any;
  selectAnswer:any = ""; 
}
export class VocabularyDetailsModel {
  vocabulary_name?:any;
  vocabulary_pronunciation?:any;
  vocabulary_types?:any;
  vocabulary_description?:any;
  simple_sentence?:any;
  simple_sentenceNew?:any;
  vocabulary_he?:any;
  vocabulary_es?:any;
  vocabulary_pl?:any;
  id?:number=0;
}

export class AnswerListedModel {
  article_id?:any;
  answers?:any[];
  date?:any;
  id:any; 
}
export class AnswerModel {
  answer?:any;
  isAnswer?:boolean = false;
}

export class GrammarModel {
  grammar_category?:any;
  grammar_image?:any;
  grammar_name?:any;
  created_at?:any;
  google_drive_link?:any;
  id?:Number;
  is_submitted?:any;
  type?:any;
}

export class GrammarDetailsModel {
  id?:any;
  grammar_name?:any;
  type?:any;
  grammar_category?:any;
  grammar_image?:any;
  google_drive_link?:Number;
  created_at?:any;
  grammar_description?:any = "";
  reading_comprehension?:ReadingComprehensionModel[];
  further_discussion?:any[];  
}