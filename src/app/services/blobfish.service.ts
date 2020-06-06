import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlobfishService {

  constructor(private http: HttpClient) {}

  unpressurizedBlobFish(name: string):any {
    return this.http.get<any>(`${environment.apiUrlFull}/image/get/${name}`)
      .pipe(map(blob => {
        console.log(blob, "blobserviceline17");
        return {
          name: name,
          imagePath: window.URL.createObjectURL(blob.picByte)
        };
      }));
  }

}
