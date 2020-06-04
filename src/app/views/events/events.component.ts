import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { Events } from "../../models/events.model";
// import { Subscription } from 'rxjs';
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  // @Input() id: number;
  events: Events[] = [];
  // private eventsSub: Subscription;

  // getEventById(id: number) {
  //   return this.eventsService.getEventById(this.id);
  // }

  constructor(private eventsService: EventsService,

    ) {}

    // this is working fine, just testing another one below to update the page after an event is deleted
    ngOnInit() {
      this.eventsService.getEvents()
      .subscribe((llama) => {
        this.events = llama, console.log("line23", llama);
      });
    }

// Testing to see if we can reload the page after an event is deleted
//   ngOnInit() {
//     this.eventsService.getEvents()
//     this.eventsSub = this.eventsService.getEventUpdateListener()
//     .subscribe((llama: Events[]) => {
//     this.events = llama, console.log("line23", llama);
//     });
// }

// This doesn't look like it deletes because for now we have to reload the page. I will fix this.
  onDelete(eventId: string) {
    this.eventsService.deleteEvent(eventId)
  }

  // ngOnDestroy() {
  //   this.eventsSub.unsubscribe();
  // }

}
