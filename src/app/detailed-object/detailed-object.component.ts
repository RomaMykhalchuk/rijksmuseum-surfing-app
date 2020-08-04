import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-detailed-object',
  templateUrl: './detailed-object.component.html',
  styleUrls: ['./detailed-object.component.scss'],
  providers: [HttpService]
})

export class DetailedObjectComponent implements OnInit {
  objId: string;
  detailedObj: any;
  constructor( private activateRoute: ActivatedRoute, private httpService: HttpService) {
    this.objId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.httpService.getArtObjDetails(this.objId).subscribe((data: any) => this.detailedObj = data );
  }

}
