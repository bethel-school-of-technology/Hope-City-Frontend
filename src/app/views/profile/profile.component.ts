import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Auth } from "src/app/models/auth.model";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  auth: Auth;
  form: FormGroup
  mageView: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // grabbing current user data and then refreshing
    this.authService.getUser().subscribe((ree) => {
      this.auth = ree;
      console.log(ree)});
    this.authService.refetchUser();
    this.form = new FormGroup({
      'image': new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
  }

  theChosenOne(event) {
    console.log(event)
    this.authService.selectedFile = <File>event.target.files[0];
    // const file = (event.target as HTMLInputElement).files[0];
    // this.form.patchValue({image: file});
    // this.form.get('image').updateValueAndValidity();
    // console.log(file, "line31")
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.mageView = reader.result as string;
    // }
    // reader.readAsDataURL(file);
    // console.log(reader, "line31")
  }

  onAddImage() {
    if (this.form.invalid) {
      return;
    }
    this.authService.addImage()
  }
}
