import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment.prod'
import { Events } from '../models/events.model'
// import { Auth } from "../models/auth.model"
import { map } from 'rxjs/operators'
import { UserEvents } from '../models/userEvents.model'

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private events: Events[] = []
  // private users: Auth[] = [];
  // private userEvents: UserEvents;
  private eventsUpdated = new Subject<Events[]>()
  // private userEventUpdated = new Subject<UserEvents[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // This is currently getting all the events for the events page
  getEvents(): Observable<Events[]> {
    return (
      this.http
        .get<Events[]>(`${environment.apiUrlDeploy}/events/getall`)
        // .get<Events[]>(`${environment.apiUrlDeploy}/events`)
        .pipe(
          map((data) => {
            data = data.map((reee) => {
              console.log('line27eventsService', reee)
              return reee
            })
            console.log('line27eventsService', data)
            return data
          }),
        )
    )
  }

  // ---------------------------------------------------------------------------------------

  // this will get all events and post them to the events page
  // this is being used for the ngOnInit on the events.component.ts
  getEvent(id: string) {
    return this.http.get<{
      id: string
      eventName: string
      hostName: string
      eventInfo: string
      eventAddress: string
      eventCity: string
      eventState: string
      eventZip: number
      eventStartTime: string
      eventEndTime: string
      eventDay: Date
    }>(`${environment.apiUrlDeploy}/events/get/` + id)
    // (`${environment.apiUrlDeploy}/events/` + id);
  }

  // ---------------------------------------------------------------------------------------

  // ↓ Getting event by the id
  getEventById(id: string): Observable<Events[]> {
    return this.http.get<Events[]>(
      `${environment.apiUrlDeploy}/events/get/` + id,
    )
    // return this.http.get<Events[]>(`${environment.apiUrlDeploy}/events/` + id);
  }

  // ---------------------------------------------------------------------------------------

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable()
  }

  // ---------------------------------------------------------------------------------------

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
    eventDay: Date,
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
      eventDay: eventDay,
    }
    return this.http
      .post<{ eventId: string }>(
        `${environment.apiUrlDeploy}/events/create`,
        event,
      )
      .pipe(
        map((respData) => {
          //should be pipe map
          const id = respData.eventId
          event.id = id
          this.events.push(event)
          this.eventsUpdated.next([...this.events])
          console.log('line 110 create event', respData)
        }),
      )
  }

  // ---------------------------------------------------------------------------------------

  attendEvent(eId: number) {
    const userEvents: UserEvents = {
      eventId: eId,
      userId: 22,
    }
    // return this.http.post<any>(`${environment.apiUrlDeploy}/userEvents/`, userEvents)
    return this.http.post<any>(
      `${environment.apiUrlDeploy}/userEvents/`,
      userEvents,
    )
  }

  // ↓ this is more like the method I will have to make once the backend is hooked up

  //attendEvent(eId:number) {
  //  return this.http.post<any>(`${environment.apiUrlDeploy}/userEvents/`, eId)
  //}

  // ---------------------------------------------------------------------------------------

  getAllUserEvents(): Observable<UserEvents[]> {
    // return this.http.get<UserEvents[]>(`${environment.apiUrlDeploy}/userEvents`)
    return this.http.get<UserEvents[]>(`${environment.apiUrlDeploy}/userEvents`)
  }

  // ---------------------------------------------------------------------------------------

  // this route it to get the userEvent which shows the event that the user is going to. (different than getEventById)
  getOneUserEvent(id: string) {
    return this.http.get<{
      id: string
      userId: string
      eventId: string
    }>(
      // (`${environment.apiUrlDeploy}/userEvents/` + id)
      `${environment.apiUrlDeploy}/userEvents/` + id,
    )
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
    eventDay: Date,
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
      eventDay: eventDay,
    }
    return this.http
      .put(`${environment.apiUrlDeploy}/events/update/` + id, event)
      .pipe(map((response) => console.log(response, 'line182 eventsService')))
  }

  // ---------------------------------------------------------------------------------------

  deleteEvent(id: string): Observable<Events> {
    return this.http.delete<Events>(
      `${environment.apiUrlDeploy}/events/delete/` + id,
    )
    // return this.http.delete<Events>(`${environment.apiUrlDeploy}/events/` + id)
  }
}
