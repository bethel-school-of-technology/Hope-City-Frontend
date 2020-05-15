import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Auth } from "./auth.model"

const URL = "http://localhost:3000";

@Injectable({ providedIn: "root" })

export class AuthService {

  constructor(private http: HttpClient) {}

  userSignUp(firstName: string, lastName: string, email: string, city: string, state: string, zip: number, password: string) {
    const signupData: Auth = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      city: city,
      state: state,
      zip: zip,
      password: password}
    this.http.post(URL + "/auth", signupData)
      .subscribe((response) => {
        console.log(response)
      })
  }

  userLogin(firstName: string, lastName: string, email: string, city: string, state: string, zip: number, password: string) {

  }

}
