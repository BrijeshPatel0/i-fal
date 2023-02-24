import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class CommonService {
  // private SytemInfoSubject = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}
  // public currentLoginUserInfoSubject = new BehaviorSubject<any>(null);
  // public loadingStateSubject = new Subject<boolean>();
  // get getAdditionalHeaders(): string {
  //   const additionalHeaders = JSON.stringify({
  //     Offset: new Date().getTimezoneOffset().toString(),
  //     Timezone: calculateTimeZone(),
  //     IPAddress: this.getSystemIpAddress(),
  //     LocationID: this.getCurrentLoginLocationId(),
  //   });
  //   return additionalHeaders;
  // }
  // getCurrentLoginLocationId(): string {
  //   let locationId: string = "";
  //   const loginData: any = this.currentLoginUserInfoSubject.value;
  //   if (loginData) {
  //     locationId = loginData.locationID
  //       ? loginData.locationID
  //       : loginData.currentLocationId;
  //   }
  //   return locationId.toString();
  // }
  // getSystemIpAddress(): string {
  //   return this.SytemInfoSubject.value && this.SytemInfoSubject.value.ipAddress;
  // }

  post(url:any, data:any): Observable<any> {
    data.deviceId = localStorage.getItem('deviceId');
    const headers = new HttpHeaders({APIKey: environment.api_key});
    return this.http.post<any>(`${environment.api_url}/${url}`, data, {headers: headers});
  }
  postExter(url:any, data:any): Observable<any> {
    var auth_token = "e65b185d54634a87a9a06f929bcf9824";
    // const headers = new HttpHeaders({token: ""});
        // const headers = new HttpHeaders({Authorization: `Bearer e65b185d54634a87a9a06f929bcf9824`});
//         const headers = new HttpHeaders();
//         headers.append('Access-Control-Allow-Headers', 'Content-Type');
//         headers.append('Access-Control-Allow-Methods', 'POST');
//         // headers.append('Access-Control-Allow-Origin', '*');
//         headers.append('Content-Type', 'application/json');
//         headers.append('Authorization', `Bearer ${auth_token}`);
//         headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
//         headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
// headers.append('Access-Control-Allow-Credentials', 'true');
        const headers = new HttpHeaders({
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': "POST",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
//         Header add Access-Control-Allow-Origin "*"
// Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"
    return this.http.post<any>(url, data, {headers: headers});
  }
  // getAll(url:any, data:any, isLoading: boolean = true) {
  //   // const key ='RE9MRUFEX0lfRkFMX0xURA==';
  //   const headers = new HttpHeaders({APIKey: environment.api_key});
  //    return this.http.get<any>('https://dummy.restapiexample.com/api/v1/employees', data)
  //      .pipe(map(res => {
  //        console.warn(res);
         
  //       //  isLoading && this.loadingStateSubject.next(false);
  //        return res;
  //      }));
  //  }
}

// function calculateTimeZone(dateInput?: Date): string {
//   var dateObject = dateInput || new Date(),
//     dateString = dateObject + "",
//     tzAbbr: any =
//       // Works for the majority of modern browsers
//       dateString.match(/\(([^\)]+)\)$/) ||
//       // IE outputs date strings in a different format:
//       dateString.match(/([A-Z]+) [\d]{4}$/);

//   if (tzAbbr) {
//     // Old Firefox uses the long timezone name (e.g., "Central
//     // Daylight Time" instead of "CDT")
//     tzAbbr = tzAbbr[1];
//   }
//   return tzAbbr;
// }
