import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;



  //Added HttpClient
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    //This is used by app.component.ts
    // currentUser is turned into an Observable that will allow other parts of the app to subscribe and get notified when currentUserSubject changes.
    this.currentUser = this.currentUserSubject.asObservable();

  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    // Changed to network based authentication strategy.

    // Read more here: https://angular.io/guide/http
    return this.http.post<any>(`http://localhost:3000/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));

  }

  register(username: string, password: string, role: string): Observable<any> {
    // Changed to network based authentication strategy.

    // Read more here: https://angular.io/guide/http
    return this.http.post<any>(`http://localhost:3000/users/register`, { username, password, role })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));

  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify all subscribers that user has logged out.
    this.currentUserSubject.next(null);
  }


}
