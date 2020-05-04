import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import {GroupService} from '../_services/group.service';
import {YelpService} from '../_services/yelp.service';
import {Group} from '../_models/group';
import {Router} from '@angular/router';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-created-group',
  templateUrl: './created-group.component.html',
  styleUrls: ['./created-group.component.css']
})
export class CreatedGroupComponent implements OnInit {

  isHost;

  constructor(private groupService: GroupService,
              private yelpService: YelpService,
              private router: Router) { }

  ngOnInit() {
    this.isHost = JSON.parse(localStorage.getItem('currentGroup')).host === JSON.parse(localStorage.getItem('currentUser')).username;
    const loop = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.groupService.getGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)))
      .subscribe((group: Group) => {
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
  }
}
