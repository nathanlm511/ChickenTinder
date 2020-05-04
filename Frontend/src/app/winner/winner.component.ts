import { Component, OnInit } from '@angular/core';
import {GroupService} from '../_services/group.service';
import {YelpService} from '../_services/yelp.service';
import {RestaurantComponent} from '../restaurant/restaurant.component';
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  winner;
  info;

  constructor(private groupService: GroupService,
              private yelpService: YelpService) { }

ngOnInit(): void {

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

}
