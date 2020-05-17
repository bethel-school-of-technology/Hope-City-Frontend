import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Events } from "./events.model"

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  public events: Observable<Events>;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${environment.apiUrl}/events`,)

  };

  getEventById(id: number) :Observable<Events[]> {
    return this.http.get<Events[]>(`${environment.apiUrl}/events + "/" + id`)
  };

  // this ↓ will be used in the eventsModal once we make it
  // I believe it should be a put but it's giving me an error which is why it's commented out. 

  // goingToEvent(id:number) :Observable<Events[]> {
  //   return this.http.put<Events[]>(`${environment.apiUrl}/events + "/" + id`)
  // }

}
