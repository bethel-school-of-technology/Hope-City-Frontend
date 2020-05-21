import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Auth } from "./auth.model";
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthService {
  public auth: Observable<Auth>;
  private authorized = false;
  private userId: string;
  private statusListener = new Subject<boolean>();
  // private token: string;
  // private timer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {}
  // can add in token when backend is ready to
  // getToken() {
  //   return this.token;
  // }

  getAuth() {
    return this.authorized;
  }

  getuserId() {
    return this.userId;
  }

  getStatusListener() {
    return this.statusListener.asObservable();
  }
  // /signup for mockdb /user for backend
  userSignUp(auth: Auth) {
    return this.http
      .post(`${environment.apiUrlDev}/user`, auth)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        this.statusListener.next(false);
      });
  }
  // /login for mockdb /user/login for backend
  userLogin(email: string, password: string) {
    return this.http
      .post<{userId: string}>(`${environment.apiUrlDev}/user/login`, { email: email, password: password })
        .subscribe(user => {
          console.log(user);
          this.authorized = true;
          this.userId = user.userId;
          this.statusListener.next(true);
          localStorage.setItem('userId', this.userId);
          this.router.navigate(['/']);
          return user;
        }, error => {
          this.statusListener.next(false);
        }
        );
  }

  logout() {
    this.authorized = false;
    this.userId = null;
    this.statusListener.next(false);
    localStorage.removeItem('userId');
    this.router.navigate(['/events']);
  }
  // adding, clearing and getting token, timer, and local storage
  // private addAuthData(token: string, userId: string) {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('userId', userId);
  // }

  // private clearAuthData() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  // }

  // private getAuthData() {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   if (!token) {
  //     return;
  //   }
  //   return {
  //     token: token,
  //     userId: userId
  //   }
  // }
}
