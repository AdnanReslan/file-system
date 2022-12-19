import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import ls from 'localstorage-slim';


@Injectable({
  providedIn: 'root',
})
export class AuthAdminService implements CanActivate {
  constructor(private router: Router) {
    ls.config.encrypt = true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| boolean| UrlTree| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
    if (ls.get('type')=='admin') {
      return true;
    } 
    else {
      this.router.navigate(['/home/profile']);
      return false;
    }
  }
}