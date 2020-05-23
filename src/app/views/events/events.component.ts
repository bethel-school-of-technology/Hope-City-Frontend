import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../events.service'
import { Events } from '../events.model';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  // @Input() id: number;
  events: Events[];

  // getEventById() {
  //   return this.eventsService.getEventById(this.id);
  // }

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
   this.eventsService.getEvents()
   .subscribe(events => this.events = events)
  }

  }

