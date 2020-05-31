import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { Events } from "../models/events.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  events: Events[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getEvents(): Observable<Events[]> {
   return this.http
      .get<Events[]>(`${environment.apiUrlFull}/events/getall`)
    .pipe(
      map((data) => {
        data = data.map((reee) => {
          console.log("line27", );
          return reee;
        });
        console.log("line27", data);
        return data;
      })
      );
    }

// ---------------------------------------------------------------------------------------

    // this will get all events and post them to the events page
    getEvent(id: string) {
      return this.http.get<{
        id: string,
        eventName: string,
        hostName: string,
        eventInfo: string,
        eventAddress: string,
        eventCity: string;
        eventState: string;
        eventZip: number;
        eventStartTime: string;
        eventEndTime: string;
        eventDay: Date;

      }>(`${environment.apiUrlFull}/events/get/` + id);
    }

// ---------------------------------------------------------------------------------------

    // ↓ this is not being used right now but we probably don't need it ↓
    getEventById(id: string) {
      return this.http.get<Events>(`${environment.apiUrlFull}/events/get/` + id);
    }

// ---------------------------------------------------------------------------------------

    // Post NEW events to the database. It will also post editing events at the moment...
    createEvent(events: Events[]) {
    return this.http.post(`${environment.apiUrlFull}/events/create`, events);
  }

// ---------------------------------------------------------------------------------------

  // ↓ New createEvent() route I'm working on. Not working yet... DO NOT DELETE.

  // createEvent(
  //   eventName: string,
  //   hostName: string,
  //   eventInfo: string,
  //   eventAddress: string,
  //   eventCity: string,
  //   eventState: string,
  //   eventZip: number,
  //   eventStartTime: string,
  //   eventEndTime: string,
  //   eventDay: Date,
  // )
  // {
  //   const eventData = new FormData();
  //   eventData.append('eventName', eventName);
  //   eventData.append('hostName', hostName);
  //   eventData.append('eventInfo', eventInfo);
  //   eventData.append('eventAddress', eventAddress);
  //   eventData.append('eventCity', eventCity);
  //   eventData.append('eventState', eventState);

  //   eventData.append('eventStartTime', eventStartTime);
  //   eventData.append('eventEndTime', eventEndTime);
  //   this.http
  //     .post

  //     (`${environment.apiUrlFull}/events/create`, eventData);
  // }

// ---------------------------------------------------------------------------------------

  // ↓ editEvent() route that I'm currently working on.

  // editEvent(id: string): Observable<Events> {
  //   return this.http.put
  //   <{
  //     id: string,
  //     eventName: string,
  //     hostName: string,
  //     eventInfo: string,
  //     eventAddress: string,
  //     eventCity: string;
  //     eventState: string;
  //     eventZip: number;
  //     eventStartTime: string;
  //     eventEndTime: string;
  //     eventDay: Date;
  //   }>
  //     (`${environment.apiUrlFull}/events/update/`, event);
  // }

// ---------------------------------------------------------------------------------------

  // editEvent() not yet working but I think I'm close.
  editEvent(
    id: string,
    eventName: string,
    hostName: string,
    eventInfo: string,
    eventAddress: string,
    eventCity: string,
    eventState: string,
    eventZip: number,
    eventStartTime: string,
    eventEndTime: string,
    eventDay: Date
  ) {
    let eventData: Events | FormData;
    eventData = new FormData();
    eventData.append('id', id);
    eventData.append('eventName', eventName);
    eventData.append('hostName', hostName);
    eventData.append('eventInfo', eventInfo);
    eventData.append('eventAddress', eventAddress);
    eventData.append('eventCity', eventCity);
    eventData.append('eventState', eventState);
    eventData.append('eventZip', eventState);
    eventData.append('eventStartTime', eventStartTime);
    eventData.append('eventEndTime', eventEndTime);

    eventData = {
      id: id,
      eventName: eventName,
      hostName: hostName,
      eventInfo: eventInfo,
      eventAddress: eventAddress,
      eventCity: eventCity,
      eventState: eventState,
      eventZip: eventZip,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventDay: eventDay

    }
    this.http.put<Events>(`${environment.apiUrlFull}/events/update/`, eventData)
    .subscribe(taco => {
      this.router.navigate(['/events']);
    })
  }

// ---------------------------------------------------------------------------------------

  // this ↓ is the route we need to make if a user clicks a button to attend an event.
  // goingToEvent(id:number) :Observable<Events[]> {
  //       return this.http.put<Events[]>(`${environment.apiUrlFull}/events/` + id)
  //     }
}
