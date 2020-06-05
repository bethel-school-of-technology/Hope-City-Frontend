import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Auth } from "../models/auth.model";
import { Image } from "../models/image.model";
import { Router } from "@angular/router";
import { map, share } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: "root" })
export class AuthService {
  auth: Auth;
  public authSubject: Subject<Auth> = new Subject();
  authorized = false;
  selectedFile: File = null;
  userId: string;
  statusListener = new Subject<boolean>();
  token: string;
  tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router, private daSnickerdoodle: CookieService) {}
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
  //creating an observable of type subject bool
  getStatusListener() {
    return this.statusListener.asObservable();
  }
  //getting current user of type auth
  getUser() {
    return this.authSubject;
  }
  //refreshes auth of auth subject
  refetchUser() {
    this.authSubject.next(this.auth);
  }
  // /signup for mockdb /user/register for backend
  userSignUp(auth: any) {
    return this.http.post(`${environment.apiUrlFull}/user`, auth);
  }
  // /login for mockdb /user/login for backend
  userLogin(auth: Auth): Observable<Auth> {
    const pho = this.http
      .post<Auth>(`${environment.apiUrlFull}/user/login`, auth)
      .pipe(share());
    pho.subscribe((user: Auth) => {
      this.auth = user;
      this.authSubject.next(user);
    });
    // console.log(pho);
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
  addAuthData(token: string, userId: string, expirationTime: Date) {
    // this.daSnickerdoodle.set('token', token);
    this.daSnickerdoodle.set("userId", userId);
    this.daSnickerdoodle.set("expiration", expirationTime.toISOString());
  }
  //clearing local storage
  clearAuthData() {
    // this.daSnickerdoodle.delete('token');
    this.daSnickerdoodle.delete("userId");
    this.daSnickerdoodle.delete("expiration");
  }
  //pulling items from local storage
  getAuthData() {
    // const token = daSnickerdoodle.get("token");
    const userId = this.daSnickerdoodle.get("userId");
    const expirationTime = this.daSnickerdoodle.get("expiration");
    if (
      // !token ||
      !expirationTime
    ) {
      return;
    }
    return {
      // token: token,
      userId: userId,
      expirationTime: new Date(expirationTime),
    };
  }

  addImage() {
    let imagine = new FormData();
    imagine.append("file", this.selectedFile, this.selectedFile.name);
    this.http
      .post<{ image: File }>(`${environment.apiUrlFull}/image/upload`, imagine)
      .subscribe((undo) => {
        console.log(undo, "line134");
      });
  }

  getImage(name: string) {
    return this.http.get<{
      name: string;
      imagePath: string;
    }>(`${environment.apiUrlFull}/get/` + name)
  }
}