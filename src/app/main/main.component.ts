import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  selectedObjectType: string;

  constructor(private httpService: HttpService, private dialog: MatDialog,
    private activateRoute: ActivatedRoute, private router: Router) {
    this.selectedObjectType = activateRoute.snapshot.params['type'];
  }

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
    this.fetchData(this.selectedObjectType);
  }

  searchArtObject() {
    this.fetchData(this.searchQuery);
  }

  sortBy() {
    this.fetchData(this.searchQuery, this.selectedSortType);
  }

  setItemsPerPage() {
    this.fetchData(this.searchQuery, this.selectedSortType, this.itemsPerPage);
  }

  fetchData(query?: string, sortType?: string, amount?: number, type?: string) {
    this.httpService.getData(query, sortType, amount, type).subscribe((data: any) => this.gallery = data.artObjects)
  }

  goTo() {
    this.router.navigate(['']);
  }

  
}
