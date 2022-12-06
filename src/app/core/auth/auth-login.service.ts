import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token.service';



@Injectable({
  providedIn: 'root',
})
export class AuthLogInService implements CanActivate {
  constructor(private token: TokenAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
     
    if (this.token.getJwtToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}