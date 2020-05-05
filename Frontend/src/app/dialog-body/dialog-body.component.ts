import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import {GroupService} from '../_services/group.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  code: number;

  constructor(private router: Router, private dialogRef: MatDialogRef<DialogBodyComponent>,
              private groupService: GroupService,
              private notif: NotificationService) { }

  ngOnInit(): void {
  }

  public join(): void {

    this.groupService.joinGroup(JSON.parse(localStorage.getItem('currentUser')).username, this.code.toString())
      .subscribe(group => {
        if (group.flag) {
          this.notif.showNotif("Incorrect Password", 'dismiss');
        }
        else {
          this.router.navigate(['group']);
          this.dialogRef.close();
        }
      });


  }
}
