import { Time } from '@angular/common';

export interface Events {
  id: string;
  hostName: string;
  eventName: string;
  eventInfo: string;
  eventAddress: string;
  eventCity: string;
  eventState: string;
  eventZip: number;
  eventStartTime: string;
  eventEndTime: string;
  eventDay: Date;
}
