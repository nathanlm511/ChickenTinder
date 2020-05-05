import { Component, OnInit } from '@angular/core';
import {GroupService} from '../_services/group.service';
import {YelpService} from '../_services/yelp.service';
import {RestaurantComponent} from '../restaurant/restaurant.component';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  winner;
  info;

  isHost;

  constructor(private groupService: GroupService,
              private yelpService: YelpService,
              private router: Router,
              private notif: NotificationService) { }

ngOnInit(): void {
  this.isHost = JSON.parse(localStorage.getItem('currentGroup')).host === JSON.parse(localStorage.getItem('currentUser')).username;

  this.groupService.getGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(data => {
        console.log(data);
        this.winner = data.winner;
        // tslint:disable-next-line:no-shadowed-variable
        this.yelpService.getYelpInfo(this.winner.id).subscribe(data => {
          console.log(data);
          this.info = data;
        });
    });

  };

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
