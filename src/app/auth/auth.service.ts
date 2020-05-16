import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Auth } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  public auth: Observable<Auth>;

  constructor(private http: HttpClient) {}

  userSignUp(auth: Auth):Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/signup`, auth)
      ;
  }

  userLogin(email: string, password: string):Observable<any> {
    return this.http
      .post<{email: string, password: string}>(`${environment.apiUrl}/login`, { email: email, password: password })
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          return user;
        })
      );
  }
}
