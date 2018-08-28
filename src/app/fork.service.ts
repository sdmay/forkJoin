import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()

export class ForkService {

  constructor(private http: HttpClient) { }
  combineInfo(brands: Array<string>, news: Array<string>): Observable<Array<any>> {
    const carTypes: Array<string> = brands;
    const source: Array<string> = news;
    const together: Array<string> = [];
    for (let i = 0; i < carTypes.length; i++) {
      for (let j = 0; j < source.length; j++) {
        together.push(`/api/rating/${carTypes[i]}/${source[j]}`);
      }
    }
    const singleObservables = together.map((singleUrl: string, urlIndexInfoValues: number) => {
      return this.http.get(singleUrl)
        .map(res => res);
    });
    return forkJoin(singleObservables);
  }
}
