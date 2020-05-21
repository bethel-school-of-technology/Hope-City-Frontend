import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MDBBootstrap
import {
  MDBBootstrapModule,
  NavbarModule,
  WavesModule,
  ButtonsModule,
  ModalModule
} from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';

// import { fakeBackendProvider } from './backendtester';

// authorization
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

// layouts
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';

// views
import { HomeComponent } from './views/home/home.component';
import { EventsComponent } from './views/events/events.component';
import { PrayerComponent } from './views/prayer/prayer.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EventsModalComponent } from './views/events-modal/events-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EventsComponent,
    PrayerComponent,
    ProfileComponent,
    EventsModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    ModalModule
  ],
  providers: [
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
