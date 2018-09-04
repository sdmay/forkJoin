import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()

export class ForkService {

  constructor(private http: HttpClient) { }
  combineInfo(brands: Array<string>, news: Array<string>, ...args: [boolean, string]): Observable<Array<any>> {
    const carTypes: Array<string> = brands;
    const source: Array<string> = news;
    const user = {
      oldEnough: args[0],
      gender: args[1]
    };
    const together: Array<string> = [];
    const allInfo: Array<any> = [];
    for (const ct of carTypes) {
      for (const s of source) {
      together.push(`/api/rating/${ct}/${s}`);
      }
    }
    for (const t of together) {
      allInfo.push(this.http.get(t));
    }
      allInfo.push(this.http.post('/api/user', user));
      return forkJoin(allInfo);
  }
}
