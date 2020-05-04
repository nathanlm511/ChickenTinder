import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {YelpService} from '../_services/yelp.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() id: number;
  info;
  empty;
  stars;
  halfstars;
  image;
  imageNum;
  transactions;


  constructor(private yelpService: YelpService) {
  }

  ngOnInit(): void {
    this.yelpService.getYelpInfo(this.id).subscribe(data => {
      console.log(data);
      this.info = data;
      this.stars = new Array(this.calcstars());
      this.halfstars = new Array(this.halfstar());
      this.empty = new Array(this.calcempty());
      this.isClosed();
      this.image = this.getImage();
      this.imageNum = 0;
      this.transactions = new Array(this.info.transactions.length-1);
    });
  }

  calcstars(): number {
    return Math.floor(this.info.rating);
  }

  halfstar(): number {
    if (this.info.rating % 1 > 0.3 && this.info.rating % 1 < 0.8) {
      return 1;
    } else {
      return 0;
    }
  }
  calcempty(): number {
    if (this.halfstar() == 1) {
      return 4 - Math.floor(this.info.rating);
    }
    return 5 - Math.floor(this.info.rating);
  }

  isClosed(): boolean {
    return this.info.is_closed;
  }

  getImage(): string {
    return this.info.photos[0];
  }

  clickLeft() {

    if (this.canClickLeft()) {
      this.imageNum -= 1;
      this.image = this.info.photos[this.imageNum];

    }
  }
  clickRight() {

    if (this.canClickRight()) {
      this.imageNum += 1;
      this.image = this.info.photos[this.imageNum];

    }

  }

  canClickLeft(): boolean {
    if (this.imageNum > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  canClickRight(): boolean {
    if (this.imageNum < this.info.photos.length-1) {
      return true;
    }
    else {
      return false;
    }
  }



}
