import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authSrv.isAuth) {
      let newReq: HttpRequest<any> = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authSrv.token}`,
        },
      });
      return next.handle(newReq);
    }

    return next.handle(req);
  }
}
