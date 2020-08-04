import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [HttpService],
})
export class MainComponent implements OnInit {

  gallery: any;
  searchQuery: string;
  selectedSortType: string;
  itemsPerPage: number;

  constructor(private httpService: HttpService, private dialog: MatDialog) { }

  openDialog(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '700px';
     
    dialogConfig.data = id;


    this.dialog.open(DialogComponent, dialogConfig);
  }

  ngOnInit() {
    this.fetch();

  }

  searchArtObject() {

    this.fetch(this.searchQuery);
  }

  sortBy() {
    this.fetch(this.searchQuery, this.selectedSortType);
  }

  setItemsPerPage() {
    this.fetch(this.searchQuery, this.selectedSortType, this.itemsPerPage);
  }

  fetch(query?: string, sortType?: string, amount?: number) {

  this.httpService.getData(query, sortType, amount).subscribe((data: any) => this.gallery = data.artObjects)

}

}
