import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {

  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getStatusListener()
      .subscribe(r => {});
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.userSignUp(form.value).subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      this.authService.statusListener.next(false);
    });;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
