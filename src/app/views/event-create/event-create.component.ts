import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service'
import { Events } from '../events.model';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  inputChurchName: string = '';
  inputInfo: string = '';
  inputEventName: string = '';
  inputAddress: string = '';
  inputCity: string = '';
  inputState: string = '';
  inputZip: string = '';
  inputEventDay: string = '';
  inputStartTime: string = '';
  inputEndTime: string = '';

  postEvent: Events [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  onCreateEvent(form: NgForm) {
    if (form.invalid) {
      console.log(form.value)
      return;
    }
    this.eventsService.createEvent(form.value);
  }

}
