
import { Injectable } from '@angular/core';


import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from 'rxjs';




@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    // DONE: get 'all users' so that the admin component can display them in a list.
    return this.http.get<User[]>(`http://localhost:3000/users/allusers`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users/register`, user);
  }

}
