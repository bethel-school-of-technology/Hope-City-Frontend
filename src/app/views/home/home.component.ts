import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlobfishService } from 'src/app/services/blobfish.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stuff: any;

  constructor(private blob: BlobfishService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    //testing img upload
    // this.blob.unpressurizedBlobFish("download (2).jpg").subscribe(stuff => {
    //   const reader = new FileReader();
    //   reader.onload = (e) => this.stuff = e.target.result;
    //   reader.onload = () => {
    //     this.stuff = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    //     console.log(reader, "line 22");
    //     console.log(reader.result, "line 22");
    //   }
    //   const headers = new Headers();
    //   reader.readAsDataURL(new Blob([stuff["picByte"],  'image/jpeg'
    // ]));
      // reader.onload = function() {
      //   var reader = 'data:image/png;base64,' + base64;
      //   var base64 = reader.result.split(',')[1];
      // }
      // s.imageURL = window["URL"].createObjectURL(s.picByte);
    // });
  }

}
