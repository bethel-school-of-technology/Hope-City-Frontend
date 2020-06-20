import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { AgmCoreModule } from '@agm/core'

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  location: Location
  zoom: number = 8;

  constructor() { }

  ngOnInit() {
    this.location = {
        latitude: 34.992960,
        longitude: -80.915830,
    }
  }

}
