import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';
import { DetailedArtObject } from '../../interfaces/DetailedArtObject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [HttpService]
})

export class DialogComponent implements OnInit {
  @Output() Changed = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private router: Router,
    private dialogRef: MatDialogRef<DialogComponent>) {
    this.id = data;
  }

  artObj: DetailedArtObject;
  id = '';

  ngOnInit(): void {
    this.httpService.getArtObjDetails(this.id)
      .subscribe(
        (data: DetailedArtObject) => { this.artObj = data; },
        (error: HttpErrorResponse) => { alert('Some error occured, please try again'); }
      );
  }

  seeDetails(): void {
    this.dialogRef.close();
    this.router.navigate([`details/${this.id}`]);
  }

  addToFavorites(): void {
    const { artObject } = this.artObj;
    this.dialogRef.close(artObject);
  }
}
