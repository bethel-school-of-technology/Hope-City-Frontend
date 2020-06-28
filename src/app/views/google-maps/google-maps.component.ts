import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  location: Location

  constructor() { }

// CHECK THE google_api_key_sample FILE FOR THIS TO WORK!
// You must add an api.ts file within the environments folder to store the api key!

  ngOnInit() {
    // this location is my (Sean Rathbun's home address)
    this.location = {
        latitude: 34.992960,
        longitude: -80.915830,
        mapType: "roadmap",
        zoom: 8,
    }
  }

}
