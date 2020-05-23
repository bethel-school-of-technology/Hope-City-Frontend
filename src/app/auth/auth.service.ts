import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Auth } from "./auth.model";
import { Router } from "@angular/router";
import { map, share } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  auth: Auth;
  public authSubject: Subject<Auth> = new Subject();
  authorized = false;
  userId: string;
  statusListener = new Subject<boolean>();
  token: string;
  tokenTimer: NodeJS.Timer;

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
  
  // /signup for mockdb /user/register for backend
  userSignUp(auth: any) {
    return this.http.post(`${environment.apiUrlDev}/signup`, auth);
  }

  // /login for mockdb /user/login for backend
  userLogin(auth: Auth): Observable<Auth> {
    const pho = this.http
      .post<Auth>(`${environment.apiUrlDev}/login`, auth)
      .pipe(share());
    pho.subscribe((user: Auth) => {
      this.auth = user;
      this.authSubject.next(user);
    });
    return pho;
  }
  // checking to authenticated user
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
      this.userId = info.userId;
      this.setTimer(expires / 1000);
      this.statusListener.next(true);
    }
  }

  logout() {
    this.userId = null;
    // this.token = null;
    this.authorized = false;
    this.statusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/events"]);
  }

  public setTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, timer * 1000);
    console.log("Timer " + timer);
  }
  //setting local storage
  addAuthData(
    // token: string,
    userId: string, expirationTime: Date) {
    // localStorage.setItem('token', token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiration", expirationTime.toISOString());
  }
  //clearing local storage
  clearAuthData() {
    // localStorage.removeItem('token');
    localStorage.removeItem("userId");
    localStorage.removeItem("expiration");
  }
  //pulling items from local storage
  getAuthData() {
    // const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationTime = localStorage.getItem("expiration");
    if (
      // !token ||
      !expirationTime) {
      return;
    }
    return {
      // token: token,
      userId: userId,
      expirationTime: new Date(expirationTime),
    };
  }
  //getting current user of type auth
  getUser() {
    return this.authSubject;
  }
  //refreshes auth of auth subject
  refetchUser() {
    this.authSubject.next(this.auth);
  }
}
