import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
// import { Auth } from "../models/auth.model";

import { environment } from "../../environments/environment";
import { Events } from "../models/events.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  events: Events[];
  // public auth: Observable<Auth>;
  // private statusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

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

  getEvent(id: string) {
    return {...this.events.find(p => p.id === id)};
  }

  // ↓ POST route in order to post an event to the database ↓
  createEvent(events: Events[]) {
    return this.http.post(`${environment.apiUrlFull}/events/create`, events);
  }

  // ↓ we are not using this yet ↓
  editEvent(event: Events): Observable<Events> {
    return this.http.put<Events>(`${environment.apiUrlFull}/events/update/{id}`, event);
  }

  // ↓ this is not being used right now ↓
  getEventById(id: string): Observable<Events> {
    return this.http.get<Events>(`${environment.apiUrlFull}/events/get/{id}` + id);
  }


  // this ↓ is the route we need to make if a user clicks a button to attend an event.
  // goingToEvent(id:number) :Observable<Events[]> {
  //       return this.http.put<Events[]>(`${environment.apiUrlFull}/events/` + id)
  //     }
}
