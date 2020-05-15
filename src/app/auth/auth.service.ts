import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Auth } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  public auth: Observable<Auth>;

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(auth: Auth) {
    this.http
      .post(`${environment.apiUrl}/signup`, auth)
      .subscribe(() => this.router.navigate(["/login"]));
  }

  userLogin(email: string, password: string) {
    return this.http
      .post<{email: string, password: string}>(`${environment.apiUrl}/login`, { email: email, password: password })
      .pipe(
        map((user) => {
          console.log(user);
          // localStorage.setItem("user", JSON.stringify(user));
          // this.router.navigate(["/login"]);
          // return user;
        })
      );
  }
}
