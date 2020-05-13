import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Auth } from "./auth.model"

const URL = "";

@Injectable({ providedIn: "root" })

export class AuthService {

  constructor(private http: HttpClient) {}

  userSignUp(email: string, password: string) {
    const signupData: Auth = {email: email, password: password}
    this.http.post(URL + '/signup', signupData)
      .subscribe((response) => {
        console.log(response)
      })
  }

  userLogin(email: string, password: string) {

  }

}
