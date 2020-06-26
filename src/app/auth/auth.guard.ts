import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Auth } from "../models/auth.model";

//guard to for user friendly redirect on protected routes
@Injectable()
export class AuthGuard implements CanActivate {
  auth: Auth;
  constructor(private authService: AuthService, private router: Router) {
    //getting user and refreshing for component
    this.authService.getUser().subscribe((u) => (this.auth = u));
    this.authService.refetchUser();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthed = this.auth != null;
    if (!isAuthed) {
      console.log("user not authorized navigating");
      this.router.navigate(["/login"]);
    }
    return isAuthed;
  }
}
