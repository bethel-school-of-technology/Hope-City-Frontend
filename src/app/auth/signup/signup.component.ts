import { Component, OnInit } from "@angular/core";
import { NgForm, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

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
    //subbing to subject boolean
    this.authStatusSub = this.authService
      .getStatusListener()
      .subscribe((r) => {});
  }

  onSignup(form: NgForm) {
    //checking the both passwords match
    if (form.value.password === form.value.passwordMatch) {
      console.log("line27", form);
      if (form.invalid) {
        alert ("Please make sure all of your information is correct and that your passwords match!")
        return;
      }
      this.authService.userSignUp(form.value).subscribe(
        () => {
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.authService.statusListener.next(false);
        }
      );
    } else {
      alert ("The form you have entered is not correct. Please make sure all of your information is correct and that your passwords match!")
      console.log("err wrong, line35");
    }
  }

  ngOnDestroy() {
    //unsubbing from subject
    this.authStatusSub.unsubscribe();
  }
}
