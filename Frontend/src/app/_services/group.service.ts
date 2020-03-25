import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class GroupService {
  constructor(private http: HttpClient) {

  }

  createGroup(username: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/addgroup`, { username })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          //this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  joinGroup() {

  }

  getGroup() {

  }
}

