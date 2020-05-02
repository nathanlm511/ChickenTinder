import { Component, OnInit } from '@angular/core';
import {GroupService} from '../_services/group.service';
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  winner;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroup(JSON.parse(localStorage.getItem('currentGroup')).passcode)
      .subscribe(data => {
        this.winner = data.winner;
    });
  }

}
