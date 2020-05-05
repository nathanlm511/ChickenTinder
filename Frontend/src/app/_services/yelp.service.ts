import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class YelpService {
  constructor(private http: HttpClient) {

  }

  getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  async getYelpIds(passcode): Promise<Observable<any>> {
    let lat = 0;
    let lng = 0;
    const loop = await this.getPosition().then(data => {
      // @ts-ignore
      lat = data.coords.latitude;
      // @ts-ignore
      lng = data.coords.longitude;
    })
    .catch(data => console.log(data));
    return this.http.post<any>(`http://localhost:3000/yelp/getIds/`, {lat, lng, passcode})
      .pipe(map(res => {
        console.log(res);
      }));
  }

  getYelpInfo(id): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/yelp/getInfo`, {id})
      .pipe(map(res => {
        return res;
      }));
  }
}

