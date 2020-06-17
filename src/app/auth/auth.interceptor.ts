import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Auth } from "../models/auth.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  auth: Auth;
  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((u) => (this.auth = u));
    this.authService.refetchUser();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.log(req.method)
    //if(req.method=="POST")console.log(req.body)
    if (this.auth != null && this.auth.jwt != null) {
      const token = this.auth.jwt;
      const reqToken = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
      return next.handle(reqToken);
    }
    return next.handle(req.clone({}));
  }
}
