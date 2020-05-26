import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Auth } from "src/app/models/auth.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  auth: Auth;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // grabbing current user data and then refreshing
    this.authService.getUser().subscribe((ree) => {
      this.auth = ree;
      console.log(ree)});
    this.authService.refetchUser();
  }

}
