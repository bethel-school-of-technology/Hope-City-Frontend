import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service'
import { Events } from '../events.model';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Events[];

  // events: Events[] = [
      // {
      //   eventName: "This is the event name",
      //   eventInfo: "Event info is here",
      //   eventAddress: "Testing Event Address",
      //   eventCity: "Testing Event City",
      //   eventState: "Testing Event State",
      //   eventZip: 29715,
      //   eventDay: new Date(2020, 2, 22)
      // }
    // ]

  constructor(private eventsService: EventsService) {
  }

    // getEvents() {
    //   this.eventsService
    //   .getEvents()
    //   console.log("Get Events", this.eventsService)
    // }

    // getEvents() {
    //   this.events = eventsService.events
    //   console.log("Get Events", this.eventsService)
    // }


  ngOnInit() {
   this.eventsService.getEvents()
   .subscribe(events => this.events = events)
    // this.getEvents()
    // console.log("ngOnInit working", this.eventsService)
  }

  // ngOnInit() {
  //   this.eventsService.getEvents()
  //   console.log("ngOnInit working", this.events)
  // }

  // this.getEvents().subscribe(events => this.events = events);

  }

