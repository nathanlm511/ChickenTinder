import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import {Group} from '../_models/group';
import {GroupService} from '../_services/group.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
import {AuthService} from '../_services/auth.service';


@Component({
  selector: 'app-tinder',
  templateUrl: './tinder.component.html',
  styleUrls: ['./tinder.component.css']
})
export class TinderComponent implements OnInit {
  votes = [];

  lastRestaurant = false;
  isHost;

  greatestRestaurant = 'No restaurant';
  greatestVotes = 0;
  numberOfUsers = 0;
  passcode = 0;
  restaurantId = 0;
  restInd = 0;
  restIndArr = [];

  constructor(private groupService: GroupService,
              private router: Router,
              private notif: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isHost = JSON.parse(localStorage.getItem('currentGroup')).host === JSON.parse(localStorage.getItem('currentUser')).username;
    this.restInd = this.restIndCalc()
    this.greatestRestaurant = 'No restaurant';
    this.votes = JSON.parse(localStorage.getItem('currentGroup')).votes;
    this.numberOfUsers = JSON.parse(localStorage.getItem('currentGroup')).users.length + 1;
    this.passcode = JSON.parse(localStorage.getItem('currentGroup')).passcode;
    this.restaurantId = JSON.parse(localStorage.getItem('currentGroup')).votes[this.restInd].id;

    const loop = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.groupService.getGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)))
      .subscribe((group: Group) => {
        // @ts-ignore
        if (group.flag) {
          this.notif.showNotif("Host closed room", 'dismiss');
          localStorage.removeItem('currentGroup');
          loop.unsubscribe();
          this.router.navigate(['find']);
        }
        console.log(group);
        const curVotes = group.votes;

        this.numberOfUsers = group.users.length;

        for (let i = 0; i < curVotes.length; i++) {

          if (curVotes[i].numVotes > this.greatestVotes) {
            this.greatestRestaurant = curVotes[i].name;
            this.greatestVotes = curVotes[i].numVotes;
          }
          if (curVotes[i].numVotes > this.numberOfUsers / 2) {
            this.groupService.setWinner(JSON.parse(localStorage.getItem('currentGroup')).passcode, curVotes[i])
              .subscribe(() => {
                loop.unsubscribe();
                this.router.navigate(['winner']);
              });
          }
        }

      });
  }
  restIndCalc() {
    let temp = 0;
    if (this.restIndArr.length !== 10) {
      temp = Math.floor(Math.random() * 10);
      for (let i = 0; i < 10; i++) {
        if (this.restIndArr.includes(temp)) {
          temp = Math.floor(Math.random() * 10);
        }
      }
      this.restIndArr.push(temp);
    }
    else {
      return -1;
    }
    return temp;
    }

  like() {
    this.groupService.addVote(JSON.parse(localStorage.getItem('currentGroup')).passcode, String(this.votes[this.restInd].id))
      .subscribe(() => {
      });
    this.restInd = this.restIndCalc();
    if (this.restInd === -1) {
      this.notif.showNotif("Visited all possible restaurants", 'dismiss');
      this.lastRestaurant = true;
    }
    else {
      this.restaurantId = this.votes[this.restInd].id;
    }
  }

  dislike() {
    this.restInd = this.restIndCalc();
    if (this.restInd === -1) {
      this.notif.showNotif("Visited all possible restaurants", 'dismiss');
      this.lastRestaurant = true;
    }
    else {
      this.restaurantId = this.votes[this.restInd].id;
    }
  }

  leave(): void {
    this.groupService.removeUser(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.router.navigate(['find']);
      });
  }

  leaveAdmin(): void {
    this.groupService.deleteGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.router.navigate(['find']);
      });
  }

  logout() {
    this.groupService.removeUser(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.authService.logout();
        this.router.navigate(['/login']);
      });
  }

  logoutAdmin() {
    this.groupService.deleteGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(() => {
        localStorage.removeItem('currentGroup');
        this.authService.logout();
        this.router.navigate(['/login']);
      });
  }
}
