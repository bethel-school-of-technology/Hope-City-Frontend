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
    public route: ActivatedRoute,
    public authService: AuthService,
    private daSnickerdoodle: CookieService
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
    // const bigCookie: boolean = this.daSnickerdoodle.check("jwt");
    // if (bigCookie) {
    //   console.log(bigCookie);
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
    // } else {
    //     console.log("no jwt")
    // }
  }

// ---------------------------------------------------------------------------------------

// ↓ This one is currently working so I will keep it for now. I'm working on the ones below as well
  // onCreateEvent(form: NgForm) {
  //   console.log("this form is invalid", form.value)
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.eventsService
  //     .createEvent(form.value)
  //     .subscribe(() => {
  //       console.log("This form was posted to the database!", form.value)
  //     this.router.navigate(['/events']);
  //   }, error => {
  //       console.log(error);
  //   });
  // }

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

// ---------------------------------------------------------------------------------------

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
  //   this.form.reset()
  // }

// ---------------------------------------------------------------------------------------

  // ↓ The newest onCreateEvent route that will most likely be the one that will work.

  // onCreateEvent() {
  //   if (this.form.invalid) {
  //     console.log("There was an error filling out the form", this.form)
  //     return;
  //   }
  //   if(this.mode === 'new-event') {
  //     this.eventsService.createEvent(
  //       this.form.value.eventName,
  //       this.form.value.hostName,
  //       this.form.value.eventInfo,
  //       this.form.value.eventAddress,
  //       this.form.value.eventCity,
  //       this.form.value.eventState,
  //       this.form.value.eventZip,
  //       this.form.value.eventDay,
  //       this.form.value.eventStartTime,
  //       this.form.value.eventEndTime
  //       );
  //       console.log("We created a new form!", this.form)
  //   } else {
  //     this.eventsService.editEvent(
  //       this.eventId,
  //       this.form.value.eventName,
  //       this.form.value.hostName,
  //       this.form.value.eventInfo,
  //       this.form.value.eventAddress,
  //       this.form.value.eventCity,
  //       this.form.value.eventState,
  //       this.form.value.eventZip,
  //       this.form.value.eventDay,
  //       this.form.value.eventStartTime,
  //       this.form.value.eventEndTime
  //     );
  //     console.log("We edited the form!", this.form)
  //   }
  //    this.form.reset()
  // }

}
