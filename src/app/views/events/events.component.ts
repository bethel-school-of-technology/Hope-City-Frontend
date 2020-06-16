import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { Events } from "../../models/events.model";
import { UserEvents } from "../../models/userEvents.model"
// import { respData } from "../../models/userEvents.model"
import { Auth } from "../../models/auth.model"
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  // @Input() attendingEvent: UserEvents = new UserEvents;
  events: Events[] = [];
  event: Events;
  user: Auth;
  attending: UserEvents;
  // resultData: respData;
  data: string;

  id: string;
  userId: string;


    constructor(
      private eventsService: EventsService,
      private authService: AuthService) {

    }

    // This was the original ngOnInit. I changed it below to see if the page reloads differently
    // ngOnInit() {
    //   this.eventsService.getEvents()
    //   .subscribe((llama) => {
    //     this.events = llama, console.log("line23", llama);
    //   });
    // }

    getEvents(): void {
      this.eventsService
      .getEvents()
      .subscribe(e => (this.events = e))
    }

    ngOnInit() {
      this.getEvents()
    }

// -------------------------------------------------------------------------------------------------------------

  onDelete(id: string): void {
    if (confirm ('Are you sure you want to delete this event?')) {
      this.eventsService
      .deleteEvent(id)
      .subscribe((e) => this.getEvents());
      console.log("Event was successfully deleted!")
    }
  }

// -------------------------------------------------------------------------------------------------------------

  attendingEvent(id: string, userId: string, eventId: string) {
    this.eventsService
      .getEventById(id)
      .subscribe(getId => console.log("Getting event by the id. Line 66", getId))

      this.authService
          .getThisUserId(id)
          console.log("get userId here", id)

      this.eventsService
      .attendEvent(
        id = this.id,
        // userId = this.user?.id,
        // eventId = this.event?.id
        userId = '2',
        eventId = '3',
      )
      .subscribe(data => console.log("Data we are sending to userEvents. Line 80", data))


        this.eventsService
          .getAllUserEvents()
          .subscribe(getEventData => console.log("Get all userEvents. Line 81", getEventData))
  }

// -------------------------------------------------------------------------------------------------------------

// ↓ another attendingEvent that I was testing

  // attendingEvent() {
  //   this.attending = new UserEvents();
  //     this.attending.id = 'test id';
  //     this.attending.userId = 'test userId';
  //     this.attending.eventId = 'test eventId';
  //     this.eventsService.attendEvent(this.attending).subscribe((res : respData) => {
  //       this.resultData = res;
  //       console.log(this.resultData.id);
  //       this.data = this.resultData.id + '-' + this.resultData.eventId
  //     })
  // }

}
