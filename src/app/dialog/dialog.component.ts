import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [HttpService]
})
export class DialogComponent implements OnInit {
  @Output() onChanged = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService,
    private router: Router, private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.id = data;
  }

  artObj: any;
  id: string;

  ngOnInit() {
    this.httpService.getArtObjDetails(this.id).subscribe((data: any) => this.artObj = data);
  }

  seeDetails() {
    this.dialogRef.close();
    this.router.navigate([`details/${this.id}`]);
  }

  addToFavorites() {
    this.dialogRef.close(this.artObj);
  }
}
