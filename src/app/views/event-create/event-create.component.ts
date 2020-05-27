import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Events } from '../../models/events.model';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

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

  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateEvent(form: NgForm) {
    console.log(form.value)
    if (form.invalid) {
      return;
    }
    this.eventsService.createEvent(form.value).subscribe(() => {
      console.log(form.value)
      this.router.navigate(['/events']);
    }, error => {
      console.log(error);
    });
  }

}
