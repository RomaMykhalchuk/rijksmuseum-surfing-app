import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {
  constructor(private http: HttpClient) { }

  getData(...params) {
    let searchQuery = params[0]||'';
    let sortType = params[1]||'';
    return this.http.get(`https://www.rijksmuseum.nl/api/en/collection?key=Jpzm2PAZ&q=${searchQuery}&s=${sortType}`);
  }
}
