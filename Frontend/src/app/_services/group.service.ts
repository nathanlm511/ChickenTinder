import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {Group} from '../_models/group';

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

  getGroup(passcode: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/getgroup`, {passcode})
      .pipe(map((group: Group) => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        }
        else {
          return {flag: "failed"};
        }
      }));
  }

  startGroup(passcode: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/startgroup`, {passcode})
      .pipe(map((group: Group) => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        } else {
          return {flag: "failed"};
        }
      }));
  }

  addVote(passcode: string, id: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/addvote`, {id, passcode})
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        } else {
          return {flag: "failed"};
        }

      }));
  }

  setWinner(passcode: string, winner: object): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/setwinner`, {winner, passcode})
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        } else {
          return {flag: "failed"};
        }
      }));
  }

  deleteGroup(passcode: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/deletegroup`, {passcode})
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        } else {
          return {flag: "failed"};
        }
      }));
  }

  removeUser(username: string, passcode: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/groups/removeuser`, {username, passcode})
      .pipe(map(group => {
        if (group && group.passcode) {
          localStorage.setItem('currentGroup', JSON.stringify(group));
          return group;
        } else {
          return {flag: "failed"};
        }
      }));
  }
}

