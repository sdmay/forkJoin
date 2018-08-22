import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()

export class ForkService {

  constructor(private http: HttpClient) { }

  getInfo(...args): Observable<any> {
    if (args[1] === 'posts') {
      return this.http.get(`https://jsonplaceholder.typicode.com/${args[1]}?userId=${args[0]}`);
    }
   if (args[1] === 'comments') {
      return this.http.get(`https://jsonplaceholder.typicode.com/${args[1]}?postId=${args[0]}`);
    }
    }
  getStuff(...args): Observable<any> {
        return this.http.get(`/api/users/${args[0]}`);
    }
  getHoro(...args): Observable<any> {
      if (args[3]) {
        return this.http.get('/api/libra');
      }
      else {
        return this.http.get('/api/not-libra');
      }
    }

}
