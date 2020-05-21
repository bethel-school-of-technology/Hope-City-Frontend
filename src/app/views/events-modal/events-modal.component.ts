import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service'
import { Events } from '../events.model';

@Component({
  selector: 'app-events-modal',
  templateUrl: './events-modal.component.html',
  styleUrls: ['./events-modal.component.scss']
})
export class EventsModalComponent implements OnInit {

  onOpened(event: any) {
    console.log(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
