import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// MDBBootstrap
import {
  MDBBootstrapModule,
  NavbarModule,
  WavesModule,
  ButtonsModule,
  ModalModule,
  CollapseModule,
  InputsModule
} from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core'
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { ErrorComponent } from './error/error.component';
import { EventCreateComponent } from './views/event-create/event-create.component';
import { AuthInterceptor } from '../app/auth/auth.interceptor';
import { GoogleMapsComponent } from './views/google-maps/google-maps.component';
import { environment } from 'src/environments/environment';
import { GOOGLE_MAPS_API } from 'src/environments/api';
import { ErrorInterceptor } from './error-interceptor';


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
    ErrorComponent,
    EventCreateComponent,
    GoogleMapsComponent,
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
    InputsModule,
    BrowserAnimationsModule,
    // this is for Google maps
    AgmCoreModule.forRoot({apiKey: GOOGLE_MAPS_API.API,
    libraries: ["places", "geometry"]})

  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
