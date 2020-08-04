import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [HttpService]
})
export class DialogComponent implements OnInit {

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) {
  this.id = data;
}

  artObj:any;
  id:string;


  ngOnInit() {
    this.httpService.getArtObjDetails(this.id).subscribe((data: any) => this.artObj = data);
  }
}
