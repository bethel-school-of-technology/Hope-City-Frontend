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
      console.log(user)
      const token = this.authService.token;
      this.authService.token = token;
      // if (token) {
      //   console.log(token);
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
          token,
          this.authService.userId, expirationTime)
        this.router.navigate(['/']);
        return user;
      // }
    }, error => {
      console.log(error)
      alert ("Sorry, but we were unable to log you in. Please make sure your email and password are correct!")
      this.authService.statusListener.next(false);
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
