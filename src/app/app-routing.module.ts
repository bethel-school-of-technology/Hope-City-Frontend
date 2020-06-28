import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HomeComponent } from "./views/home/home.component";
import { EventsComponent } from "./views/events/events.component";
import { PrayerComponent } from "./views/prayer/prayer.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from "./auth/auth.guard";
import { EventCreateComponent } from "./views/event-create/event-create.component";
import { GoogleMapsComponent } from "./views/google-maps/google-maps.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "events", component: EventsComponent },
  { path: "prayer", component: PrayerComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "new-event", component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:eventId", component: EventCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
