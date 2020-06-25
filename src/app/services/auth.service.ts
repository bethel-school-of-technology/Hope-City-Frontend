import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'

import { environment } from '../../environments/environment.prod'
import { Auth } from '../models/auth.model'
import { Router } from '@angular/router'
import { map, share } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth: Auth
  public authSubject: Subject<Auth> = new Subject()

  selectedFile: File = null

  statusListener = new Subject<boolean>()

  tokenTimer: NodeJS.Timer

  thisThing = [
    'userId',
    'jwt',
    'firstName',
    'lastName',
    'email',
    'city',
    'state',
    'zip',
  ]

  constructor(
    private http: HttpClient,
    private router: Router,
    private daSnickerdoodle: CookieService,
  ) {
    if (this.auth == null) {
      this.authUser()
    }
  }

  // getuserId() {
  //   return this.userId;
  // }

  // doing some testing so I duplicated the above method so I can change it a little.
  // using this for attending() in the events.component.ts. Right now it's getting the event id, not the user id
  getThisUserId(id: string): Observable<Auth[]> {
    return this.http.get<Auth[]>(`${environment.apiUrlDeploy}/user/` + id)
    // return this.http.get<Auth[]>(`${environment.apiUrlDeploy}/userEvents/` + id)
  }

  //creating an observable of type subject bool
  getStatusListener() {
    return this.statusListener.asObservable()
  }
  //getting current user of type auth
  getUser() {
    return this.authSubject
  }
  //refreshes auth of auth subject
  refetchUser() {
    this.authSubject.next(this.auth)
  }
  // /signup for mockdb /user/register for backend
  userSignUp(auth: Auth) {
    return this.http.post(`${environment.apiUrlDeploy}/user`, auth)
    // return this.http.post(`${environment.apiUrlDeploy}/signup`, auth);
  }
  // /login for mockdb /user/login for backend
  userLogin(auth: Auth): Observable<Auth> {
    const pho = this.http
      .post<Auth>(`${environment.apiUrlDeploy}/user/login`, auth)
      // (`${environment.apiUrlDeploy}/login`, auth)
      .pipe(share())
    pho.subscribe((user: Auth) => {
      this.auth = user
      this.authSubject.next(user)
    })
    // console.log(pho);
    return pho
  }
  // checking to authenticated user
  authUser() {
    const info = this.getAuthData()
    if (!info) {
      return
    }
    if (this.auth == null) {
      var refresh = {}
      this.thisThing.forEach((these) => {
        refresh[these] = this.daSnickerdoodle.get(these)
      })
      this.auth = <Auth>refresh
    }
    const now = new Date()
    const expires = info.expirationTime.getTime() - now.getTime()
    if (expires > 0) {
      console.log(expires, 'line73authService')
      this.auth.jwt = info.jwt
      // this.auth.authorized = true;
      this.auth.userId = info.userId
      this.setTimer(expires / 1000)
      this.statusListener.next(true)
      this.refetchUser()
    }
  }

  logout() {
    // this.auth.userId = null;
    // this.auth.jwt = null;
    // this.auth.authorized = false;
    this.auth = null //this can replace the last 3 lines

    this.statusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/events'])
    this.refetchUser()
  }

  public setTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, timer * 1000)
    console.log('Timer ' + timer, 'line96authservice')
  }
  //setting local storage
  addAuthData(jwt: string, userId: Auth, expirationTime: Date) {
    this.thisThing.forEach((these) => {
      this.daSnickerdoodle.set(these, userId[these])
    })
    this.daSnickerdoodle.set('expiration', expirationTime.toISOString())
  }
  //clearing local storage
  clearAuthData() {
    this.daSnickerdoodle.delete('jwt')
    this.daSnickerdoodle.delete('userId')
    this.daSnickerdoodle.delete('expiration')
  }
  //pulling items from local storage
  getAuthData() {
    const jwt = this.daSnickerdoodle.get('jwt')
    const userId = this.daSnickerdoodle.get('userId')
    const expirationTime = this.daSnickerdoodle.get('expiration')
    if (!jwt || !expirationTime) {
      return
    }
    return {
      jwt: jwt,
      userId: userId,
      expirationTime: new Date(expirationTime),
    }
  }

  addImage() {
    let imagine = new FormData()
    imagine.append('file', this.selectedFile, this.selectedFile.name)
    return this.http

      .post<{ image: File }>(
        `${environment.apiUrlDeploy}/image/upload`,
        imagine,
      )
      .pipe(
        map((poo) => {
          console.log(poo, 'line 135authservice')
        }),
      )
  }

  getImage(name: string) {
    return this.http.get<{
      name: string
      imagePath: string
    }>(`${environment.apiUrlDeploy}/get/` + name)
  }
}
