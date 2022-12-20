import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler ,HttpErrorResponse,HttpEvent} from "@angular/common/http";
import { TokenAuthService } from "./token.service";
import { finalize, Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable()

export class AuthHeaderInterceptor implements HttpInterceptor {
    
    constructor(private tokenAuthService: TokenAuthService,private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const jwtHeaderToken = this.tokenAuthService.getJwtToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + jwtHeaderToken
            }
        });
      
        return next.handle(req).pipe( tap((res : any) => {
         
            if (req instanceof HttpErrorResponse) {
         
                if (req.status !== 401) {
                    return;
                   }
                   this.router.navigate(['login']);
            }
          
        },
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
         
            if (err.status !== 401) {
                return;
               }
               this.router.navigate(['login']);
        }
      }));

    }
}