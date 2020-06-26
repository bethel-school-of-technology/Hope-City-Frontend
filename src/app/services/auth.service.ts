import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Auth } from "../models/auth.model";
import { Router } from "@angular/router";
import { map, share } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthService {
  auth: Auth;
  //subject for user
  public authSubject: Subject<Auth> = new Subject();

  selectedFile: File = null;
  //subject for authorized or not
  statusListener = new Subject<boolean>();

  tokenTimer: NodeJS.Timer;

  thisThing = [
    "userId",
    "jwt",
    "firstName",
    "lastName",
    "email",
    "city",
    "state",
    "zip",
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private daSnickerdoodle: CookieService
  ) {
    if (this.auth == null) {
      this.authUser();
    }
  }

  // getuserId() {
  //   return this.userId;
  // }

  // doing some testing so I duplicated the above method so I can change it a little.
  // using this for attending() in the events.component.ts. Right now it's getting the event id, not the user id
  getThisUserId(id: string): Observable<Auth[]> {
    return this.http.get<Auth[]>(`${environment.apiUrlFull}/user/` + id)
    // return this.http.get<Auth[]>(`${environment.apiUrlDev}/userEvents/` + id)
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
  userSignUp(auth: Auth) {
    return this.http.post(`${environment.apiUrlFull}/user`, auth);
    // return this.http.post(`${environment.apiUrlDev}/signup`, auth);
  }
  // /login for mockdb /user/login for backend
  userLogin(auth: Auth): Observable<Auth> {
    const pho = this.http
      .post<Auth>
        (`${environment.apiUrlFull}/user/login`, auth)
        // (`${environment.apiUrlDev}/login`, auth)
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
    if (this.auth == null) {
      var refresh = {};
      this.thisThing.forEach((these) => {
        refresh[these] = this.daSnickerdoodle.get(these);
      });
      this.auth = <Auth>(refresh);
    }
    const now = new Date();
    const expires = info.expirationTime.getTime() - now.getTime();
    if (expires > 0) {
      console.log(expires, "line73authService");
      this.auth.jwt = info.jwt;
      // this.auth.authorized = true;
      this.auth.userId = info.userId;
      this.setTimer(expires / 1000);
      this.statusListener.next(true);
      this.refetchUser();
    }
  }

  logout() {
    this.auth = null;
    this.statusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/events"]);
    this.refetchUser();
  }
  //timer for logout stuff
  public setTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, timer * 1000);
    console.log("Timer " + timer, "line96authservice");
  }
  //setting local storage
  addAuthData(jwt: string, userId: Auth, expirationTime: Date) {
    this.thisThing.forEach((these) => {
      this.daSnickerdoodle.set(these, userId[these]);
    });
    this.daSnickerdoodle.set("expiration", expirationTime.toISOString());
  }
  //clearing local storage
  clearAuthData() {
    this.daSnickerdoodle.delete("jwt");
    this.daSnickerdoodle.delete("userId");
    this.daSnickerdoodle.delete("expiration");
  }
  //pulling items from local storage
  getAuthData() {
    const jwt = this.daSnickerdoodle.get("jwt");
    const userId = this.daSnickerdoodle.get("userId");
    const expirationTime = this.daSnickerdoodle.get("expiration");
    if (!jwt || !expirationTime) {
      return;
    }
    return {
      jwt: jwt,
      userId: userId,
      expirationTime: new Date(expirationTime),
    };
  }

  addImage() {
    let imagine = new FormData();
    imagine.append("file", this.selectedFile, this.selectedFile.name);
    return this.http

      .post<{ image: File }>(`${environment.apiUrlFull}/image/upload`, imagine)
      .pipe(
        map((s) => {
          console.log(s, "line 135authservice");
        })
      );
  }

  getImage(name: string) {
    return this.http.get<{
      name: string;
      imagePath: string;
    }>(`${environment.apiUrlFull}/get/` + name);
  }
}
