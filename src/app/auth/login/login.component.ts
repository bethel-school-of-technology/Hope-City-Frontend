import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getStatusListener()
      .subscribe(r => {});
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.userLogin(form.value)
    .subscribe(user => {
      console.log(user, "login comp line 30")
      const jwt = user.jwt;
      console.log(jwt, "login comp line 32")
      this.authService.jwt = jwt;
      console.log(jwt, "login comp line 34")
      if (jwt) {
        console.log(jwt, "line 36 login comp");
        const expiresIn = 10000;
        this.authService.setTimer(expiresIn);
        this.authService.authorized = true;
        this.authService.userId = user.id;
        this.authService.statusListener.next(true);
        const now = new Date();
        const expirationTime = new Date(
          now.getTime() + expiresIn * 1000
          );
        this.authService.addAuthData(
          jwt,
          this.authService.userId, expirationTime)
        this.router.navigate(['/']);
        return user;
      }
    }, error => {
      console.log(error, "line 51 login comp")
      this.authService.statusListener.next(false);
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
