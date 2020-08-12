import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { HttpService } from '../http.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtObject } from '../../interfaces/artObject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [HttpService],
})

export class MainComponent implements OnInit {
  gallery: ArtObject[] = [];
  searchQuery = '';
  selectedSortType: string;
  itemsPerPage = 10;
  currentPage = 1;
  selectedObjectType = '';
  totalInGallery: number;
  isFavoriteMode = false;
  favorites = [];

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router) {
    this.selectedObjectType = activateRoute.snapshot.params.type;
  }

  openDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '700px';
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === '') {
          return;
        } else if (!this.favorites.some(obj => obj.objectNumber === data.objectNumber)) {
          this.favorites.push(data);
          const favoriteData = JSON.parse(localStorage.getItem('favorites') || '[]');
          favoriteData.push(data);
          localStorage.setItem('favorites', JSON.stringify(favoriteData));
        } else {
          alert('This art object was already added to favorites');
        }
      }
    );
  }

  ngOnInit(): void {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', '[]');
    }
    const favData = localStorage.getItem('favorites');
    this.favorites = JSON.parse(favData);
    this.fetchData(this.selectedObjectType);
  }

  searchArtObject(): void {
    if (this.searchQuery.length > 0) {
      this.fetchData(this.searchQuery);
      this.searchQuery = '';
    } else {
      alert('Search query shouldn"t be empty');
    }
  }

  sortBy(): void {
    this.fetchData(this.searchQuery, this.selectedSortType);
  }

  setItemsPerPage(): void {
    this.fetchData(this.searchQuery, this.selectedSortType, this.itemsPerPage);
  }

  fetchData(query?: string, sortType?: string, amount?: number, type?: string, currentPage?: number): void {
    this.httpService
      .getData(query, sortType, amount, type, currentPage)
      .subscribe(
        (data: any) => {
          this.totalInGallery = data.count;
          this.gallery = data.artObjects;
        },
        (error: HttpErrorResponse) => alert('Error occured, please try again'));
  }

  goTo(): void {
    this.router.navigate(['']);
  }

  setFavoritesMode(): void {
    this.isFavoriteMode = !this.isFavoriteMode;
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
    this.fetchData(this.searchQuery, this.selectedSortType, this.itemsPerPage, this.selectedObjectType, event);
  }
}
