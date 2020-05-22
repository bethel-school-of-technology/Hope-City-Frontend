import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../events.service'
import { Events } from '../events.model';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-events-modal',
  templateUrl: './events-modal.component.html',
  styleUrls: ['./events-modal.component.scss']
})
export class EventsModalComponent implements OnInit {

  @Input() id: number;
  events: Events[];

  getEventById() {
    return this.eventsService.getEventById(this.id);
  }

  constructor(private eventsService: EventsService) { }

  ngOnInit() {

  //   this.eventsService.getEventById()
  //  .subscribe(events => this.events = events)
  //  console.log("getEventById in the ngOnInit", this.events)
  };
}
