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

  events: Events[] = []

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Events[]> {
      return this.http.get<Events[]>(`${environment.apiUrlDev}/events`)
    }

  editEvent(): Observable<Events> {
    return this.http.get<Events>(`${environment.apiUrlDev}/events + id`)
  }

  getEventById(id: number) {
    return this.http.get<Events[]>(`${environment.apiUrlDev}/events` + "/" + id)
    .subscribe(events => {
      this.events = events;
        console.log(this.events)
    })
  }

// this ↓ is the route we need to make if a user clicks a button to attend an event.
  // goingToEvent(id:number) :Observable<Events[]> {
    //     return this.http.put<Events[]>(`${environment.apiUrl}/events` + "/" + id)
    //   }

}
