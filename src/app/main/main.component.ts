import { Component, OnInit } from '@angular/core';
import {HttpService } from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [HttpService],
})
export class MainComponent implements OnInit {

  gallery: Object;
  searchQuery:string;
  selectedSortType:string;

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService.getData().subscribe((data: any) => this.gallery = data.artObjects);
  }

  searchArtObject() {
    console.log(this.gallery);
    this.httpService.getData(this.searchQuery).subscribe((data: any) => this.gallery = data.artObjects);
  }

  sortBy() {
    this.httpService.getData(this.searchQuery, this.selectedSortType).subscribe((data: any) => this.gallery = data.artObjects);
  }

}
