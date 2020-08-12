import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DetailedArtObject } from '../../interfaces/DetailedArtObject';

import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-object',
  templateUrl: './detailed-object.component.html',
  styleUrls: ['./detailed-object.component.scss'],
  providers: [HttpService]
})

export class DetailedObjectComponent implements OnInit {
  objId: string = '';
  detailedObj: DetailedArtObject;
  constructor( private activateRoute: ActivatedRoute, private httpService: HttpService, private router: Router) {
    this.objId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.httpService.getArtObjDetails(this.objId).subscribe((data: DetailedArtObject) => this.detailedObj = data );
  }

  lookForRelatedTags(objType):void {
    this.router.navigate([`/${objType.target.innerText}`]);
  }

  navigateHome():void {
    this.router.navigate(['']);
  }
}
