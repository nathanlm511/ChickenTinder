import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogBodyComponent} from '../dialog-body/dialog-body.component';
import {Router} from '@angular/router';
import {YelpService} from '../_services/yelp.service';

import {GroupService} from '../_services/group.service';
import {AuthService} from '../_services/auth.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-group-finder',
  templateUrl: './group-finder.component.html',
  styleUrls: ['./group-finder.component.css']
})
export class GroupFinderComponent implements OnInit {

  constructor(private matDialog: MatDialog, private router: Router,
              private groupService: GroupService, private yelpService: YelpService) {

  }

  ngOnInit() {
  }

  public joinGroup(): void {
    const dialogRef = this.matDialog.open(DialogBodyComponent, {
      width: '450px',
      height: '250px'
    });
  }

  public createGroup(): void {
    this.groupService.createGroup(JSON.parse(localStorage.getItem('currentUser')).username)
      .subscribe(group => {
        this.yelpService.getYelpIds(JSON.parse(localStorage.getItem('currentGroup')).passcode)
          .then(data => data.subscribe(() => console.log("sent ids")));
        this.router.navigate(['group']);
      });
  }
}
