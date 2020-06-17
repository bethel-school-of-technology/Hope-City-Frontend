import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "../../services/auth.service";
import { Auth } from "src/app/models/auth.model";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  auth: Auth;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe((u) => (this.auth = u));
    this.authService.refetchUser();

    this.authStatusSub = this.authService
      .getStatusListener()
      .subscribe((r) => {});
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.userLogin(form.value).subscribe(
      (user) => {
        console.log(user, "login comp line 30");
        const jwt = user.jwt;
        console.log(jwt, "login comp line 32");
        this.auth.jwt = jwt;
        console.log(jwt, "login comp line 34");
        if (jwt) {
          console.log(jwt, "line 36 login comp");
          const expiresIn = 10000;
          this.authService.setTimer(expiresIn);
          // this.auth.authorized = true;
          this.auth.userId = user.id;
          this.authService.statusListener.next(true);
          const now = new Date();
          const expirationTime = new Date(now.getTime() + expiresIn * 1000);
          this.authService.addAuthData(jwt, this.auth, expirationTime);
          this.authService.authSubject.next(this.auth);
          this.router.navigate(["/"]);
          return user;
        }
      },
      (error) => {
        console.log(error, "line 51 login comp");
        alert ("Sorry, but we were unable to log you in. Please make sure your email and password are correct!")
        this.authService.statusListener.next(false);
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
