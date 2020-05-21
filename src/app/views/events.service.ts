import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Events } from "./events.model";

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  // events: Events[] = [];

  events: Events[] = []

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Events[]> {
      return this.http.get<Events[]>(`${environment.apiUrlDev}/events`)
    }

    // this ↓ is working enough to console.log the data from the mock database.
    // getEvents() {
    //   return this.http.get<Events[]>(`${environment.apiUrl}/events`)
    //   .subscribe(eventsData => {
    //     this.events = eventsData;

    //     console.log("this is the getEvents() from the eventsService", this.events);
    //   })
    // }

    getEventById(id: number) :Observable<Events[]> {
      return this.http.get<Events[]>(`${environment.apiUrlDev}/events + "/" + id`)
    };

    // this ↓ will be used in the eventsModal once we make it
    // I believe it should be a put but it's giving me an error which is why it's commented out.

    // goingToEvent(id:number) :Observable<Events[]> {
      //   return this.http.put<Events[]>(`${environment.apiUrl}/events + "/" + id`)
      // }

    }








    // getEvents() {
    //   return this.http.get<{events: any}>(`${environment.apiUrl}/events`)
    //     .pipe(map((eventData) => {
    //       return { events: eventData.events.map(events => {
    //         return {
    //           eventName: events.eventName,
    //           eventInfo: events.eventInfo
    //         };
    //       })};
    //     }))
    //     .subscribe(getSomeEventData => {
    //       this.events = getSomeEventData.events;
    //     });
    // };
