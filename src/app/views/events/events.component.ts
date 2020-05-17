import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events = [];

  constructor(private EventsService: EventsService) { }

  ngOnInit() {

    this.EventsService.getEvents()
    .subscribe(allEvents => this.events = allEvents);
  }

}
