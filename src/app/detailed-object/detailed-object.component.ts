import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { DetailedArtObject } from '../../interfaces/DetailedArtObject';
import { HttpService } from '../http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detailed-object',
  templateUrl: './detailed-object.component.html',
  styleUrls: ['./detailed-object.component.scss'],
  providers: [HttpService]
})

export class DetailedObjectComponent implements OnInit {
  objId = '';
  detailedObj: DetailedArtObject;
  constructor(
    private activateRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router) {
    this.objId = activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.httpService.getArtObjDetails(this.objId)
      .subscribe(
        (data: DetailedArtObject) => { this.detailedObj = data; },
        (error: HttpErrorResponse) => { alert('Some error occured, please try again'); }
      );
  }

  lookForRelatedTags(objType: { target: { innerText: string; }; }): void {
    this.router.navigate([`/${objType.target.innerText}`]);
  }

  navigateHome(): void {
    this.router.navigate(['']);
  }
}
