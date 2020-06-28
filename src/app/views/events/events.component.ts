import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { Events } from "../../models/events.model";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/models/auth.model';
import { UserEvents } from "../../models/userEvents.model"

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {

  auth:Auth;
  events: Events[] = [];
  userAuthorized = false;
  private authListenerSubs: Subscription;
  event: Events;
  user: Auth;
  attending: UserEvents;
  data: string;
  id: string;
  userId: string;


  constructor(
    private eventsService: EventsService,
    private authService: AuthService
    ) {}

// here we are getting all the events and subscribing to that data
    getEvents(): void {
      this.eventsService
      .getEvents()
      .subscribe(e => (this.events = e))
    }

    ngOnInit() {
      this.authService.getUser().subscribe((u) => {
        this.auth = u;
        this.userAuthorized = u != null;
      });
      this.authService.refetchUser();

      this.authListenerSubs = this.authService
      .getStatusListener()
      .subscribe((isAuthorized => {
        this.userAuthorized = isAuthorized;
      }));
      this.getEvents()
    }

// -------------------------------------------------------------------------------------------------------------

// this will delete the event by the id
  onDelete(id: string): void {
// I added a confirm button so the user doesn't accidentally delete an event
    if (confirm ('Are you sure you want to delete this event?')) {
      this.eventsService
      .deleteEvent(id)
      .subscribe((e) => this.getEvents());
      console.log("Event was successfully deleted!")
    }
  }

    ngOnDestroy() {
      this.authListenerSubs.unsubscribe();
    }
// -------------------------------------------------------------------------------------------------------------

// the attendingEvent is the button I have been working on for the many to many relationship. Since the backend is not fully functioning I was working on posting data to our mockDatabase
// this button is successfully posting the eventId to our third table in the mockDatabase. Waiting on backend to be working
  attendingEvent(eventId: number){
    this.eventsService.attendEvent(eventId)
      .subscribe(data => console.log("Data we are sending to userEvents. Line 90", data))
      alert("The event you're attending has an id of " + eventId + ". " + "This has been successfully been posted to the mockDatabase!")
// ↓ this is just to see that we are getting all of the events that are in our third table that joins users and events
    this.eventsService
      .getAllUserEvents()
      .subscribe(getEventData => console.log("Get all userEvents. Line 81", getEventData))
  }

}
