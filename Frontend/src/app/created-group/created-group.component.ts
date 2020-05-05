import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import {GroupService} from '../_services/group.service';
import {YelpService} from '../_services/yelp.service';
import {Group} from '../_models/group';
import {Router} from '@angular/router';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AuthService} from '../_services/auth.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-created-group',
  templateUrl: './created-group.component.html',
  styleUrls: ['./created-group.component.css']
})
export class CreatedGroupComponent implements OnInit {

  isHost;

  constructor(private groupService: GroupService,
              private yelpService: YelpService,
              private router: Router,
              private notif: NotificationService) { }

  ngOnInit() {
    this.isHost = JSON.parse(localStorage.getItem('currentGroup')).host === JSON.parse(localStorage.getItem('currentUser')).username;
    const loop = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.groupService.getGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)))
      .subscribe((group: Group) => {
        // @ts-ignore
        if (group.flag === 'failed') {
          this.notif.showNotif("Host closed room", 'dismiss');
          localStorage.removeItem('currentGroup');
          loop.unsubscribe();
          this.router.navigate(['find']);

        }
        console.log(JSON.parse(localStorage.getItem('currentUser')).username);
        console.log(group);
        if (group.started === true) {
          console.log(group);
          loop.unsubscribe();
          this.router.navigate(['tinder']);
        }
      });
  }

  public generateCode(): number {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code;
  }

  get group() {
    return JSON.parse(localStorage.getItem('currentGroup'));
  }

  public start(): void {
    this.groupService.startGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        this.router.navigate(['tinder']);
      });
  }

  public leave(): void {
    this.groupService.removeUser(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.router.navigate(['find']);
      });
  }

  public leaveAdmin(): void {
    this.groupService.deleteGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.router.navigate(['find']);
      });
  }
}
