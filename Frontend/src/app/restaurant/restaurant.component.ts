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

  constructor(private yelpService: YelpService) { }

  ngOnInit(): void {
    this.yelpService.getYelpInfo(this.id).subscribe(data => {
      console.log(data);
      this.info = data;
    });

  }

}
