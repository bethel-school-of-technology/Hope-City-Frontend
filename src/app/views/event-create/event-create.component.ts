import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Events } from '../../models/events.model';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";

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

  form: FormGroup;
  private mode = 'new-event';
  private eventId: string;
  event: Events;

  constructor(
    public eventsService: EventsService,
    public router: Router,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'eventName': new FormControl(null, {
        // form validators can go here
      }),
      'hostName': new FormControl(null, {
      }),
      'eventInfo': new FormControl(null, {
      }),
      'eventAddress': new FormControl(null, {
      }),
      'eventCity': new FormControl(null, {
      }),
      'eventState': new FormControl(null, {
      }),
      'eventZip': new FormControl(null, {
      }),
      'eventStartTime': new FormControl(null, {
      }),
      'eventEndTime': new FormControl(null, {
      }),
      'eventDay': new FormControl(null, {
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('eventId')) {
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.eventsService.getEvent(this.eventId)
        .subscribe(eventData => {
          this.event =
          {
            id: eventData.id,
            eventName: eventData.eventName,
            hostName: eventData.hostName,
            eventInfo: eventData.eventInfo,
            eventAddress: eventData.eventAddress,
            eventCity: eventData.eventCity,
            eventState: eventData.eventState,
            eventZip: eventData.eventZip,
            eventStartTime: eventData.eventStartTime,
            eventEndTime: eventData.eventEndTime,
            eventDay: eventData.eventDay

          }
          this.form.setValue({
            'eventName': this.event.eventName,
            'hostName': this.event.hostName,
            'eventInfo': this.event.eventInfo,
            'eventAddress':this.event.eventAddress,
            'eventCity': this.event.eventCity,
            'eventState': this.event.eventState,
            'eventZip': this.event.eventZip,
            'eventStartTime': this.event.eventStartTime,
            'eventEndTime': this.event.eventEndTime,
            'eventDay': this.event.eventDay
          })
          console.log("We are editing an event", paramMap, this.eventId)
        })
      } else {
        this.mode = 'new-event'
        this.eventId = null;
        console.log("We are creating a new event", this.eventId)
      }
    });

  }

// ---------------------------------------------------------------------------------------

// ↓ Sean testing June 4th
  onSaveEvent(form: NgForm) {
    if (form.invalid) {
      alert ("The form you have entered is invalid! Please review your information and try again.")
      console.log("this form is invalid", form.value)
      return;
    }
    if (this.mode === 'new-event') {
      this.eventsService.createEvent(
        form.value.eventName,
        form.value.hostName,
        form.value.eventInfo,
        form.value.eventAddress,
        form.value.eventCity,
        form.value.eventState,
        form.value.eventZip,
        form.value.eventStartTime,
        form.value.eventEndTime,
        form.value.eventDay
        )
        // for some reason when I save a new event it shows both console logs as if we are also editing the event...
        // I need to have a look at this and see what's going on.
        this.router.navigate(['/events']);
        console.log("This is a new event and was posted to the database!", form.value)
    } else {
      this.eventsService.updateEvent(
        this.eventId,
        form.value.eventName,
        form.value.hostName,
        form.value.eventInfo,
        form.value.eventAddress,
        form.value.eventCity,
        form.value.eventState,
        form.value.eventZip,
        form.value.eventStartTime,
        form.value.eventEndTime,
        form.value.eventDay)
    }
    this.router.navigate(['/events']);
    console.log("This form was edited and posted to the database!", form.value)
  }

}
