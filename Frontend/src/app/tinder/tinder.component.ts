import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import {Group} from '../_models/group';
import {GroupService} from '../_services/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tinder',
  templateUrl: './tinder.component.html',
  styleUrls: ['./tinder.component.css']
})
export class TinderComponent implements OnInit {
  votes = [];

  greatestRestaurant = 'No restaurant';
  greatestVotes = 0;
  numberOfUsers = 0;
  passcode = 0;
  restaurantId = 0;
  restInd = 0;
  restIndArr = [];

  constructor(private groupService: GroupService,
              private router: Router) { }

  ngOnInit() {
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
        console.log(group);
        const curVotes = group.votes;

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
      temp = Math.floor(Math.random() * 9);
      for (let i = 0; i < 10; i++) {
        if (this.restIndArr.includes(temp)) {
          Math.floor(Math.random() * 9);
        }
      }
      this.restIndArr.push(temp);
    }
    if (this.restIndArr.length === 10) {
      temp = -1;
      // this.restInd = temp;
    }
    return temp;
    }

  like() {
    this.groupService.addVote(JSON.parse(localStorage.getItem('currentGroup')).passcode, String(this.votes[this.restInd].id))
      .subscribe(() => {
        console.log("Liked " +  this.votes[this.restInd].name);
      });
    this.restInd = this.restIndCalc();
  }

  dislike() {
    console.log("Disliked " + this.votes[this.restInd].name);
    this.restInd = this.restIndCalc();
  }
}
