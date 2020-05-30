import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Events } from '../../models/events.model';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { NgForm, FormGroup } from "@angular/forms";
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

  // postEvent: Events [];
  // events = new Events;
  form: FormGroup;
  // editEvent: Events = new Events()
  private mode = 'new-event';
  private eventId: string;
  public events: Events;

  constructor(
    public eventsService: EventsService,
    public router: Router,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('eventId')) {
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.events = this.eventsService.getEvent(this.eventId);
        console.log("We are editing an event", paramMap, this.eventId)
      } else {
        this.mode = 'new-event'
        this.eventId = null;
        console.log("We are creating a new event", this.eventId)
      }
    });

  }


  onCreateEvent(form: NgForm) {
    console.log(form.value)
    if (form.invalid) {
      return;
    }
    this.eventsService
      .createEvent(form.value)
      .subscribe(() => {
        console.log(form.value)
      this.router.navigate(['/events']);
    }, error => {
        console.log(error);
    });
  }

  // onCreateEvent(form: NgForm) {
  //   console.log(form.value)
  //   if (form.invalid) {
  //     return;
  //   }
  //   if(this.mode === 'new-event') {
  //     this.eventsService
  //       .createEvent(form.value)
  //       .subscribe(() => {
  //         console.log(form.value)
  //       this.router.navigate(['/events']);
  //     }, error => {
  //         console.log(error);
  //     });
  //   }
  //   else {
  //     this.eventsService
  //     .editEvent(form.value)
  //     .subscribe(() => {
  //       console.log(form.value)
  //     this.router.navigate(['/events']);
  //   }, error => {
  //       console.log(error);
  //   });
  //   }
  //   // this is throwing an error for some reason. I think I need to define what the reset does.
  //   // this.form.reset()
  // }

}
