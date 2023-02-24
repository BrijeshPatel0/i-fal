import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router ) {
    // const getToken: any = localStorage.getItem('token');
    // const terms:any = JSON.parse(window.atob(getToken.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsuserclaim"]
 
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token') != null)
      {
        return true;
      }
      else {
        this._router.navigate(['/login']);
        return false;
      }
  }
  
}
