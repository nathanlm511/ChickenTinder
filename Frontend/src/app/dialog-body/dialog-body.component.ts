import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  code: number;

  constructor(private router: Router, private dialogRef: MatDialogRef<DialogBodyComponent>) { }

  ngOnInit(): void {
  }

  public join(): void {
    this.router.navigate(['group']);
    this.dialogRef.close();

  }
}
