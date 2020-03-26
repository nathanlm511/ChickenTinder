import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-created-group',
  templateUrl: './created-group.component.html',
  styleUrls: ['./created-group.component.css']
})
export class CreatedGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public generateCode(): number {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code;
  }

  get group() {
    return JSON.parse(localStorage.getItem('currentGroup'));
  }

  public start(): void {

  }

  public leave(): void {

  }
}
