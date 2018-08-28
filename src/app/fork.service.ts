import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import 'rxjs/add/operator/map';
@Injectable()

export class ForkService {

  constructor(private http: HttpClient) { }
  combineInfo(infoValues): Observable<Array<any>> {
    const carTypes = infoValues[0][0];
    const source = infoValues[0][1];
    const together = [];
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
