import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MDBBootstrap
import {
  MDBBootstrapModule,
  NavbarModule,
  WavesModule,
  ButtonsModule,
  ModalModule,
  CollapseModule
} from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

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
import { EventCreateComponent } from './views/event-create/event-create.component';

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
    EventsModalComponent,
    EventCreateComponent,
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
    ModalModule,
    CollapseModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
