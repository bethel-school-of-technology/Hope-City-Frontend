import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { Events } from "../../models/events.model";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  // @Input() id: number;
  events: Events[] = [];

  // getEventById(id: number) {
  //   return this.eventsService.getEventById(this.id);
  // }

  constructor(private eventsService: EventsService,

    ) {}

  ngOnInit() {
      this.eventsService.getEvents()
      .subscribe((llama) => {
        this.events = llama, console.log("line23", llama);
      });
  }

}
