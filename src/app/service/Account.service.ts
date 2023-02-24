import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, concatMap, EMPTY, finalize, from, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../auth/auth.modal';
const baseUrl = `${environment.api_url}/accounts`;
declare const FB: any;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(null!);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    login() {
        // login with facebook then authenticate with the API to get a JWT auth token
        this.facebookLogin()
            .pipe(concatMap(accessToken => this.apiAuthenticate(accessToken)))
            .subscribe(() => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            });
    }

    facebookLogin() {
        // login with facebook and return observable with fb access token on success
        return from(new Promise<any>(resolve => FB.login(resolve)))
            .pipe(concatMap(({ authResponse }) => {
                if (!authResponse) return EMPTY;
                return of(authResponse.accessToken);
            }));
    }

    apiAuthenticate(accessToken: string) {
        // authenticate with the api using a facebook access token,
        // on success the api returns an account object with a JWT auth token
        return this.http.post<any>(`${baseUrl}/authenticate`, { accessToken })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startAuthenticateTimer();
                return account;
            }));
    }

    logout() {
        // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
        FB.api('/me/permissions', 'delete', null, () => FB.logout());
        this.stopAuthenticateTimer();
        this.accountSubject.next(null!);
        this.router.navigate(['/login']);
    }

    getAll() {
        return this.http.get<Account[]>(baseUrl);
    }

    getById(id:any) {
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }
    
    update(id:any, params:any) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                // update the current account if it was updated
                if (account.id === this.accountValue.id) {
                    // publish updated account to subscribers
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
                if (id === this.accountValue.id)
                    this.logout();
            }));
    }

    // helper methods

    private authenticateTimeout: string | number | NodeJS.Timeout | undefined;

    private startAuthenticateTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.accountValue.token!.split('.')[1]));

        // set a timeout to re-authenticate with the api one minute before the token expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        const { accessToken } = FB.getAuthResponse();
        this.authenticateTimeout = setTimeout(() => {
            this.apiAuthenticate(accessToken).subscribe();
        }, timeout);
    }

    private stopAuthenticateTimer() {
        // cancel timer for re-authenticating with the api
        clearTimeout(this.authenticateTimeout);
    }
}