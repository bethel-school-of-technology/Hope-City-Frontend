import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { Events } from "../../models/events.model";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/models/auth.model';
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  // @Input() id: number;
  auth:Auth;
  events: Events[] = [];
  private eventsSub: Subscription;
  userAuthorized = false;
  private authListenerSubs: Subscription;

  // getEventById(id: number) {
  //   return this.eventsService.getEventById(this.id);
  // }

  constructor(private eventsService: EventsService,
    private authService: AuthService
    ) {}

    // this is working fine, just testing another one below to update the page after an event is deleted
    // ngOnInit() {
    //   this.eventsService.getEvents()
    //   .subscribe((llama) => {
    //     this.events = llama, console.log("line23", llama);
    //   });
    // }

    getEvents(): void {
      this.eventsService
      .getEvents()
      .subscribe(e => (this.events = e))
    }

    ngOnInit() {
      this.authService.getUser().subscribe((u) => {
        this.auth = u;
        this.userAuthorized = u != null;
      });
      this.authService.refetchUser();

      this.authListenerSubs = this.authService
      .getStatusListener()
      .subscribe((isAuthorized => {
        this.userAuthorized = isAuthorized;
      }));
      this.getEvents()
    }


    // Testing to see if we can reload the page after an event is deleted
    //   ngOnInit() {
      //     this.eventsService.getEvents()
      //     this.eventsSub = this.eventsService.getEventUpdateListener()
      //     .subscribe((llama: Events[]) => {
        //     this.events = llama, console.log("line23", llama);
        //     });
        // }

        // This doesn't look like it deletes because for now we have to reload the page. I will fix this.
        // onDelete(id: string) {
          //   this.eventsService.deleteEvent(id);
  // }


  onDelete(id: string): void {
    if (confirm ('Are you sure you want to delete this event?')) {
      this.eventsService
      .deleteEvent(id)
      .subscribe((e) => this.getEvents());
    }
  }

  // ngOnDestroy() {
    //   this.eventsSub.unsubscribe();
    // }
    ngOnDestroy() {
      this.authListenerSubs.unsubscribe();
    }

}
