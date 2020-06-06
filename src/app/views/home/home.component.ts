import { Component, OnInit } from '@angular/core';
import { BlobfishService } from 'src/app/services/blobfish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private blob: BlobfishService) { }

  ngOnInit(): void {
    this.blob.unpressurizedBlobFish("download.jpg").subscribe(poo => {
      console.log(poo, "line 15")
    });
  }

}
