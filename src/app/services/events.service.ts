import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Events } from "../models/events.model";
import { map } from "rxjs/operators";
import { UserEvents } from '../models/userEvents.model';

@Injectable({
  providedIn: "root",
})

export class EventsService {
  private events: Events[] = [];
  private eventsUpdated = new Subject<Events[]>();

  constructor(private http: HttpClient) {}

  // This is currently getting all the events for the events page
  getEvents(): Observable<Events[]> {
   return this.http
      .get<Events[]>(`${environment.apiUrlFull}/events/getall`)
      // .get<Events[]>(`${environment.apiUrlDev}/events`)
    .pipe(
      map((data) => {
        data = data.map((reee) => {
          console.log("line27eventsService", reee);
          return reee;
        });
        console.log("line27eventsService", data);
        return data;
      })
      );
    }

// ---------------------------------------------------------------------------------------

    // this will get the event by the id and render it to the edit page
    // this is being used for the ngOnInit on the events-create.component.ts
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
      }>
      (`${environment.apiUrlFull}/events/get/` + id);
      // (`${environment.apiUrlDev}/events/` + id);
    }

// ---------------------------------------------------------------------------------------

    getEventUpdateListener() {
      return this.eventsUpdated.asObservable();
    }

// ---------------------------------------------------------------------------------------

// we are taking all of the data within our model and posting it to the database
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
    // we are telling which data to post in the request
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
    .pipe(map(respData => {
      const id = respData.eventId;
      event.id = id;
      // ↓ we are pushing the events data to the Events table
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
      console.log("line 110 create event", respData)
    }))
  }

// ---------------------------------------------------------------------------------------


// UpdateEvent is connected to the event-create.component.ts
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
      // updating the event by the id based on the properties in the const above that are in the model
      return this.http.put(`${environment.apiUrlFull}/events/update/` + id, event)
      .pipe(map(response => console.log(response, "line136 eventsService")));

    }

// ---------------------------------------------------------------------------------------

// deleting events in the database
    deleteEvent(id: string): Observable<Events> {
      return this.http.delete<Events>(`${environment.apiUrlFull}/events/delete/` + id)
      // return this.http.delete<Events>(`${environment.apiUrlDev}/events/` + id)
    }

// ---------------------------------------------------------------------------------------

// attendEvent() is attached to the attending button on the events page
// So far we are able to post the eventId and I have hard coded a userId for now
// run json-server mockDatabase.json to see the eventId post to the mockDatabase
attendEvent(eId:number) {
  const userEvents : UserEvents = {
    eventId: eId,
    userId: 22
  }
  // return this.http.post<any>(`${environment.apiUrlFull}/userEvents/`, userEvents)
  return this.http.post<any>(`${environment.apiUrlDev}/userEvents/`, userEvents) // right now we are running off the mockDatabase since the backend is not fully set up for attending
}

// ↓ this is more like the method I will have to make once the backend is hooked up
// the backend should handle the userId information to make it more secure

//attendEvent(eId:number) {
//  return this.http.post<any>(`${environment.apiUrlFull}/userEvents/`, eId)
//}

// ---------------------------------------------------------------------------------------

// This is for attending so that an admin can see all the data in our attending table (many to many table)
getAllUserEvents(): Observable<UserEvents[]> {
  // return this.http.get<UserEvents[]>(`${environment.apiUrlFull}/userEvents`)
  return this.http.get<UserEvents[]>(`${environment.apiUrlDev}/userEvents`)
}

// ---------------------------------------------------------------------------------------

// This is for attending
// this route it to get the userEvent which shows the event that the user is going to. (different than getEventById)
getOneUserEvent(id: string) {
  return this.http.get<{
    id: string,
    userId: string,
    eventId: string
  }>
  // (`${environment.apiUrlFull}/userEvents/` + id)
  (`${environment.apiUrlDev}/userEvents/` + id)
}

}

