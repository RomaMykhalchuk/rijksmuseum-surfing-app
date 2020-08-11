import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import  {ArtObject} from  '../../interfaces/artObject';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [HttpService],
})
export class MainComponent implements OnInit {
  gallery: ArtObject[] = [];
  searchQuery: string;
  selectedSortType: string;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  selectedObjectType: string = '';
  total: number;
  isFavoriteMode: boolean = false;
  favorites = [];

  constructor(private httpService: HttpService, private dialog: MatDialog,
    private activateRoute: ActivatedRoute, private router: Router) {
    this.selectedObjectType = activateRoute.snapshot.params['type'];
  }

  openDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '700px';
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);
        if (data === '') {
          return;
        } else if (!this.favorites.some(obj => obj.objectNumber === data.objectNumber)) {
          this.favorites.push(data);
          const favoriteData = JSON.parse(localStorage.getItem('favorites') || '[]');
          favoriteData.push(data);
          localStorage.setItem('favorites', JSON.stringify(favoriteData));
        } else {
          alert('already added');
        }
      }
    );
  }

  ngOnInit() {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', '[]');
    }
    const favData = localStorage.getItem('favorites');
    this.favorites = JSON.parse(favData);
    this.fetchData(this.selectedObjectType);
  }

  searchArtObject() {
    if (this.searchQuery.length > 0) {
    this.fetchData(this.searchQuery);
  } else {
    alert("Search query shouldn't be empty");
  }
  }

  sortBy() {
    this.fetchData(this.searchQuery, this.selectedSortType);
  }

  setItemsPerPage() {
    this.fetchData(this.searchQuery, this.selectedSortType, this.itemsPerPage);
  }

  fetchData(query?: string, sortType?: string, amount?: number, type?: string, currentPage?: number) {
    this.httpService.getData(query, sortType, amount, type, currentPage).subscribe((data: any) => {
      this.total = data.count;
      this.gallery = data.artObjects;
    })
  }

  goTo() {
    this.router.navigate(['']);
  }

  setFavoritesMode() {
    this.isFavoriteMode = !this.isFavoriteMode;
    console.log(this.isFavoriteMode);
  }

  handlePageChange(event) {
    console.log(event);
    this.currentPage = event;
    this.fetchData(this.searchQuery, this.selectedSortType, this.itemsPerPage, this.selectedObjectType, event);
  }
}
