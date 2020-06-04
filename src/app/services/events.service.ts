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
  private events: Events[] = [];
  private eventsUpdated = new Subject<Events[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // This is currently getting all the events fine but I need to change it so that the page updates after deleting an event
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

    // Here, I was working up getting the events differently so that the page can reload after an event is deleted.
  // getEvents() {
  //   this.http
  //      .get<{ event: any}>(
  //        `${environment.apiUrlFull}/events/getall`
  //        )
  //    .pipe(map((data) => {
  //           return data.event.map(events => {
  //             console.log("line27", );
  //          return {
  //            eventName: events.eventName,
  //            hostName: events.hostName,
  //            eventInfo: events.eventInfo,
  //            eventAddress: events.eventAddress,
  //            eventCity: events.eventCity,
  //            eventState: events.eventState,
  //            eventZip: events.eventZip,
  //            eventStartTime: events.eventStartTime,
  //            eventEndTime: events.eventEndTime,
  //            eventDay: events.eventDay
  //           };
  //         });
  //       }))
  //       .subscribe(transformedPosts => {
  //         this.events = transformedPosts;
  //         this.eventsUpdated.next([...this.events]);
  //       });
  //       console.log("Returning Data", );
  //   }

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

    getEventUpdateListener() {
      return this.eventsUpdated.asObservable();
    }

// ---------------------------------------------------------------------------------------

    // Post NEW events to the database. This IS WORKING. It will also post editing events at the moment...
    // I created a new createEvent() below that now works to add a new event and does not interfere with editing an event.
  //   createEvent(events: Events[]) {
  //   return this.http.post(`${environment.apiUrlFull}/events/create`, events);
  // }

  // This is the newest createEvent() method that is now working as of June 4th.
  createEvent(
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
    const event: Events = {
      id: null,
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
    return this.http.post<{ eventId: string }>(`${environment.apiUrlFull}/events/create`, event)
    .subscribe(respData => {
      const id = respData.eventId;
      event.id = id;
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
    })
  }

// ---------------------------------------------------------------------------------------

// UpdateEvent working on June 4th
  updateEvent(
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
      const event: Events = {
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
      };
      this.http.put(`${environment.apiUrlFull}/events/update/` + id, event)
      .subscribe(response => console.log(response));
    }

// ---------------------------------------------------------------------------------------

    deleteEvent(id: string) {
      this.http.delete(`${environment.apiUrlFull}/events/delete/` + id)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== id);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      })
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
