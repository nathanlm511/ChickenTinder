import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class GroupService {
  constructor(private http: HttpClient) {

  }

  createGroup(host: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/addgroup`, { host })
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
        }
        return group;
      }));
  }

  joinGroup(username: string, passcode: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/joingroup`, { username, passcode })
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        }
        else {
          return {flag: "failed"};
        }

      }));
  }

  getGroup() {

  }
}

