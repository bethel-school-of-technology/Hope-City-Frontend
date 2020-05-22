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
  private token: string = "saklhgasdlkg";
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {}
  // can add in token when backend is ready to
  getToken() {
    return this.token;
  }

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
      .post(`${environment.apiUrlFull}/user`, auth)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        this.statusListener.next(false);
      });
  }

  // /login for mockdb /user/login for backend
  userLogin(email: string, password: string) {
    return this.http
//       .post<{userId: string}>(`${environment.apiUrlFull}/user/login`, { email: email, password: password })
      .post<{
        // token: string,
        userId: string, expires: number}>(`${environment.apiUrlDev}/login`, { email: email, password: password })
        .subscribe(user => {
          // const token = user.token;
          // this.token = token;
          // if (token) {
          //   console.log(token);
            const expiresIn = 3600;
            this.setTimer(expiresIn);
            this.authorized = true;
            this.userId = user.userId;
            this.statusListener.next(true);
            const now = new Date();
            const expirationTime = new Date(now.getTime() + expiresIn * 1000);
            this.addAuthData(
              // token,
              this.userId, expirationTime)
            this.router.navigate(['/']);
            // return user;
          // }
        }, error => {
          console.log(error)
          this.statusListener.next(false);
        });
  }


  authUser() {
    const info = this.getAuthData();
    if (!info) {
      return;
    }
    const now = new Date();
    const expires = info.expirationTime.getTime() - now.getTime();
    if (expires > 0) {
      console.log(expires);
      // this.token = info.token;
      this.authorized = true;
      this.userId = info.userId
      this.setTimer(expires / 1000);
      this.statusListener.next(true);
    }
  }

  logout() {
    this.userId = null;
    this.token = null;
    this.authorized = false;
    this.statusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/events']);
  }

  private setTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },  timer * 1000);
    console.log("Timer " + timer);
  }

  private addAuthData(
    // token: string,
    userId: string, expirationTime: Date) {
    // localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationTime.toISOString());
  }

  private clearAuthData() {
    // localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    // const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationTime = localStorage.getItem('expiration');
    console.log(userId, expirationTime)
    if (
      // !token ||
      !expirationTime) {
      return;
    }
    return {
      // token: token,
      userId: userId,
      expirationTime: new Date(expirationTime)
    }
  }
}
