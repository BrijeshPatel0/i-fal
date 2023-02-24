export class FindTeacherModel {
  id?: number;
  first_name?: String;
  last_name?: string;
  alternate_email?: string;
  thumbnail?: string;
  user_type?: string;
  login_type?: string;
  gender?: string;
  sloatId?: string;
  is_whatsapp_notification_on?: string;
  is_email_notification_on?: string;
  session_settings?: string;
  birth_date?: string;
  english_type?: string;
  bio?: string;
  youtube_link?: string;
  teacher_ratings?: string;
  total_ratings?: string;
  attainment?: string;
  last_seven_days_total_ratings?: string;
  holidays?: Array<any>[];
  availabilities1?: AvailabilitiesModel[];
  is_verified?: string;
  is_active?: string;
  is_deleted?: string;
  isNewUser?: string;
  isPhoneVerified?: string;
  created_at?: string;
  sessionId?: string;
}

export class AvailabilitiesModel {
  coach_id?: string;
  days?: string;
  is_available?: string;
  from_time?: string;
  to_time?: string;
  break_from_time?: string;
  break_to_time?: string;
}

export class SingleTeacherDetailsModel {
  id?: any;
  first_name?: any;
  last_name?: any;
  thumbnail?: any;
  email?: any;
  birth_date?: any;
  gender?: any;
  user_type?: any;
  youtube_link?: any;
  bio?: any;
  pay_pal_email?: any;
  teacher_ratings?: any;
  total_ratings?: any;
  last_seven_days_total_ratings?: any;
  is_verified?: any;
  is_active?: any;
  is_deleted?: any;
  created_at?: any;
  availabilities1?: Array<any>[];
  holidays?: Array<any>[];
  ratings?: Array<any>[];
}

export class TeacherRatingsModel {
  id?: number;
  rating_id?: number;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  thumbnail?: string;
  comment?: string;
  created_at?: string;
  rating?: string;
}

export class TeacherSlotModel {
  id?: number;
  start?: string;
  end?: string;
  isBooked?: boolean;
  start_date?: string;
  newDate?: string;
  startTimeNumber?:number;
  isAlready?:number;
}

export class LastmonthScoreModel {
  month?: any;
  total_score?: any;
  last_total_score?: any;
  level_name?: any;
  level_description?: any;
}
