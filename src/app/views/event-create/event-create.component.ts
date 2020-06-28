import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service'
import { Events } from '../../models/events.model';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

// properties with empty string for our two way data binding in the modal window
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
  private mode = 'new-event'; // this mode checks the path in the app-routing.module
  private eventId: string;
  event: Events;

  constructor(
    public eventsService: EventsService,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'eventName': new FormControl(null, {
        // form validators can go here, though we are using MDBValidate in our HTML instead
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
      // if statement checking to see if the URL has an eventId attached. If it does, we are in edit mode
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
          // we have subscribed to the eventData and we are setting the value of the form to that of the eventId
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
        // if the URL is /new-event the we know that we are just loading the event-create.component.html page without preloaded data
        this.mode = 'new-event'
        this.eventId = null;
        console.log("We are creating a new event", this.eventId)
      }
    });

  }

// ---------------------------------------------------------------------------------------

  onSaveEvent(form: NgForm) {
    // if the form is invalid the user will get an alert so they know to review their information and resubmit it
    if (form.invalid) {
      alert ("The form you have entered is invalid! Please review your information and try again.")
      console.log("this form is invalid", form.value)
      return;
    }
    // when clicking the save event button we are checking the URL to see if this is a new event or if we are editing an event
    if (this.mode === 'new-event') {
      // if the URL is /new-event then we are calling the createEvent method in the eventService and posting that data to the database
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
        ).subscribe(e=>{
          // once the form is submitted we will immediately navigate to the events page where the user can see the newly created event
          this.router.navigate(['/events']);
          console.log("This is a new event and was posted to the database!", form.value)
        })

    } else {
      // if the URL is not /new-event then we are calling the updateEvent method in the eventsService
      // this will put (update) that event by the id rather than posting a new event
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
        form.value.eventDay).subscribe( r => {
          // we are subscribing to that data and also navigating to the events page
          this.router.navigate(['/events']);
        })
      }
      console.log("This form was edited and posted to the database!", form.value)
  }

}
