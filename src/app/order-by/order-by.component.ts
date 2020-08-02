import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent {

  sortTypes=["relevance","objecttype","chronologic","achronologic","artist","artistdesc"];
  selectedSortType:string;

}
