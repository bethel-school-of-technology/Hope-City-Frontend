import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Auth } from "src/app/models/auth.model";
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlobfishService } from 'src/app/services/blobfish.service';
import { window } from 'rxjs/operators';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  auth: Auth;
  form: FormGroup
  mageView: string;
  poo: any;

  constructor(private authService: AuthService, private blob: BlobfishService) {}

  ngOnInit() {
    // this.blob.unpressurizedBlobFish("download (2).jpg").subscribe(poo => {
    //   console.log(poo, "line 15");
    //   window["URL"] = ["URL"] || window["webkitURL"];
    //   console.log((URL));
    //   const reader = new FileReader();
    //   reader.onload = (e) => this.poo = e.target.result;
    //   reader.readAsDataURL(new Blob([poo.picByte]));
    //   // poo.imageURL = window["URL"].createObjectURL(poo.picByte);
    //   // this.poo = poo.imageURL;
    // });
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
    console.log(event, "line34")
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
    this.authService.addImage().subscribe(cheese => {
      console.log(cheese, "line 53")
    });
  }
}
