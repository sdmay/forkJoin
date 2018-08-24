import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import 'rxjs/add/operator/map';
@Injectable()

export class ForkService {
combined;
together = [];
  constructor(private http: HttpClient) { }
  combineInfo(infoValues): Observable<Array<any>>   {
    const carTypes = infoValues[0][0];
    const source = infoValues[0][1];
    for (let i = 0; i < carTypes.length; i++) {
      for (let j = 0; j < source.length; j++) {
          this.together.push(`/api/rating/${carTypes[i]}/${source[j]}`);
      }
    }
    const singleObservables = this.together.map((singleUrl: string, urlIndeinfoValues: number) => {
      return this.getSingle(singleUrl)
          .map(p => p);
          // .catch((error: any) => {
          //     console.error('Error loading Single, singleUrl: ' + singleUrl, 'Error: ', error);
          //     return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
          // });
  });

  return forkJoin(singleObservables);
  }
  getSingle(singleUrl: string): Observable<any> {
  return this.http.get(singleUrl)
      .map((r: Response) => r);
}
  getNews(...infoValues): Observable<any> {
  return this.http.get(`/api/rating/${infoValues[2]}/forbes`);
}



}
