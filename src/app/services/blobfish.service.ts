import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobfishService {

  constructor(private http: HttpClient) {}

  unpressurizedBlobFish(name: string):Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrlDeploy}/image/get/${encodeURI(name)}`);
  }

}
