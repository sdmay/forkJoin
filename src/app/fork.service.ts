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
  combineInfo(x): Observable<Array<any>>   {
    console.log(x[0][0].length);
    const carTypes = x[0][0];
    const source = x[0][1];
    // console.log(z[0], z[1], z[2]);
    for (let i = 0; i < carTypes.length; i++) {
      for (let j = 0; j < source.length; j++) {
          console.log(source[j]);
          this.together.push(`/api/rating/${carTypes[i]}/${source[j]}`);
      }
    }
    console.log(this.together);
    const singleObservables = this.together.map((singleUrl: string, urlIndex: number) => {
      return this.getSingle(singleUrl)
          .map(p => {
            console.log(p as Array<any>);
            return p as Array<any>;
          });
          // .catch((error: any) => {
          //     console.error('Error loading Single, singleUrl: ' + singleUrl, 'Error: ', error);
          //     return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
          // });
  });

  return forkJoin(singleObservables);
  }
    // console.log(this.combined);
    getSingle(singleUrl: string): Observable<any> {
      return this.http.get(singleUrl)
          .map((r: Response) => r);

  }
getNews(...x): Observable<any> {

  return this.http.get(`/api/rating/${x[2]}/forbes`);
}
  getInfo(userid, postorcomment): Observable<any> {
    console.log(userid);
    if (postorcomment === 'posts') {
      return this.http.get(`https://jsonplaceholder.typicode.com/${postorcomment}?userId=${userid}`);
    }
   if (postorcomment === 'comments') {
      return this.http.get(`https://jsonplaceholder.typicode.com/${postorcomment}?postId=${userid}`);
    }
    }
  getStuff(userid): Observable<any> {
        return this.http.get(`/api/users/${userid}`);
    }
  getHoro(libra): Observable<any> {
      if (libra) {
        return this.http.get('/api/libra');
      }
      else {
        return this.http.get('/api/not-libra');
      }
    }

}
