import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  onSignup(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.userSignUp(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.city,
      form.value.state,
      form.value.zip,
      form.value.password)
  }

  ngOnInit(): void {
  }

}
