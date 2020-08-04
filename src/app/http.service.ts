import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {
  constructor(private http: HttpClient) { }
  getData(...params) {
    const searchQuery = params[0]||'';
    const sortType = params[1]||'';
    const itemsPerPage = params[2] | 10;
    const objType = params[3] || '';
    const apiKey = "Jpzm2PAZ";

    return this.http.get(`https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&q=${searchQuery}&s=${sortType}&ps=${itemsPerPage}&type=${objType}`);
  }

  getArtObjDetails(objId:string) {
    const apiKey = "Jpzm2PAZ";

    return this.http.get(`https://www.rijksmuseum.nl/api/en/collection/${objId}?key=${apiKey}`);

  }
}
