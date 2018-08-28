import { Component, OnInit } from '@angular/core';
import { ForkService } from './fork.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  registerForm: FormGroup;
  q1 = new FormControl('', [
  ]);
  q2 = new FormControl('', [
  ]);
  q3 = new FormControl('', [
  ]);
  q4 = new FormControl('', [
  ]);
  dataHolder = [];
  nameInfo;
  youngMan = false;
  newsSource = [];
  carData = [];
  canView = '';
  libra = false;
  oldEnough = false;
  showNow = false;
  result = false;
  carPicked = [];
  allOfIt;
  carInfo;
  rating = [];
  comment = false;
  maybe = this.newsSource.length < 0 ? false : true;
  maybeCar = this.carPicked.length < 0 ? false : true;
totalRating = {};
  cars = ['Ford', 'Chevrolet', 'Honda', 'Toyota'];
  topix = ['cnn', 'fox', 'forbes'];
  decade = [1999, 2000, 2001, 2003];
  carRating;
  carSource;
  carNames = [];
  highestRated;
  constructor (private forkService: ForkService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.forkService.getNews(...this.cars).subscribe(data => {
      console.log(data);
      // this.carData = data;
    });
        this.registerForm = this.formBuilder.group({
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      q4: this.q4
    });
  }
onNews(e: HTMLInputElement) {
  // [""0""].target.value
  this.newsSource.push(e.target.value);
  console.log(this.newsSource);
}
onClick(e: HTMLInputElement) {
  this.carData.push(e.target.value);
}
onSubject(e: HTMLInputElement) {
  this.carData.push(e.target.value);
  console.log(this.carData);
}
onCar(e: HTMLInputElement) {
  this.carPicked.push(e.target.value);
  console.log(this.carPicked);
}
  tupleFunction() {
  this.getTuple('Name', 'email', [[...this.carPicked], [...this.newsSource]]);
  }
 getTuple(name, email, ...args): void {
   this.carData = [];
  //  this.newsSource = [];
      this.forkService.combineInfo(args).subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++ ) {
          this.carData.push(data[i]);
          this.rating.push(data[i].rating);
          this.dataHolder.push(data[i].car);
          // this.carSource.push({
          //   'source': data[i].source,
          //   'rating': data[i].rating,
          //   'car': data[i].car
          // });
          // this.carRating = new Set([...this.rating]);
        }
        this.carInfo = new Set([...this.dataHolder]);
        console.log(this.carInfo.size);
        // for (let c = 0; c < this.carInfo.size; c++) {
        //       const rating = [];
        //       console.log('for')
        //       console.log(this.carInfo[c]);
        //       for (let d = 0; d < this.carData.length; d++) {
        //             if (this.carInfo[c].car === this.carData[d].car) {
        //               rating.push(this.carData[d].rating);
        //             }
        //       }
        // }
        console.log(this.carInfo);
        this.result = true;
        if (this.carInfo.size > 0) {
          // for (const item of this.carInfo.values()) {
            this.carNames = Array.from(this.carInfo);
            // console.log(item);
          }
          console.log(this.carNames);
          for (let c = 0; c < this.carNames.length; c++) {
            for (let d = 0; d < this.carData.length; d++) {
              const x = [];
                          if (this.carNames[c] === this.carData[d].car) {
                            // rating.push(this.carData[d].rating);
                            // const z = Object.keys(this.totalRating);

                            // console.log(x);
                            // const x = this.totalRating[this.carNames[c]] || 0;
                            console.log(this.carNames[c]);
                            x.push(this.carData[d].rating);
                            const y = x.reduce((a, b) => a + b, 0);
                            // const y = this.totalRating[this.carNames[c]];
                            console.log('ttetetete', y);
                            const math = y + this.carData[d].rating / d;

                            this.totalRating[this.carNames[c]] = math;
                            if (x.length > 0) {
                              const carVals = Object.values(this.totalRating);
                            const carKeys = Object.keys(this.totalRating)
                            const ded = carVals.indexOf(Math.max(...carVals));
                            console.log('Highest one', carKeys[ded]);
                            this.highestRated = carKeys[ded];

                            // for (let u = 0; 0 < carKeys.length; u++) {
                            //   console.log(carKeys.length);
                            //                     console.log(this.totalRating[u]);
                            // }

                            }
                          }
                    }
          }
        // }
      });
        this.nameInfo = name;
        this.showNow = true;
        // this.newsSource = [];

    }
        // const postOrComment = this.registerForm.value.q1;
    // this.registerForm.value.q2 = +this.registerForm.value.q2;
    // if (this.registerForm.value.q3 === 'true') {
    //   this.registerForm.value.q3 = true;
    // }
    // else {
    //   this.registerForm.value.q3 = false;
    // }
    // if (this.registerForm.value.q4 === 'true') {
    //   this.registerForm.value.q4 = true;
    // }
    // else {
    //   this.registerForm.value.q4 = false;
    // }

  // console.log(this.newsSource);
  }

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
      // for (let j = 0; i < x.length; j++) {
    }
      // const apiString = ;
    // }
    // this.together.map(singleUrl  => {
    // console.log(singleUrl);
    // });
    console.log(this.together);
    const urlMap = this.together.map((singleUrl: string, urlIndex: number) => {
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

  return forkJoin(urlMap);
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
  getnewsSource(libra): Observable<any> {
      if (libra) {
        return this.http.get('/api/libra');
      }
      else {
        return this.http.get('/api/not-libra');
      }
    }

}
<form [formGroup]="registerForm" (ngSubmit)="tupleFunction()">
<select class="form-control" name="q1" formControlName="q1" >
  <option value="" selected disabled>Posts or Comments</option>
  <option value="posts">Posts</option>
  <option value= "comments">Comments</option>
</select>
<select class="form-control" name="q2" formControlName="q2">
    <option value="" selected disabled>User Id?</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <!-- <option value= "false">No</option> -->
  </select>
  <select class="form-control" name="q3" formControlName="q3">
      <option value="" selected disabled>Over 18?</option>
      <option [value]="true">Yes</option>
      <option [value]= "false">No</option>
    </select>
    <select class="form-control" name="q4" formControlName="q4" >
        <option value="" selected disabled>Libra</option>
        <option [value]="true">Yes</option>
        <option [value]= "false">No</option>
      </select>
    <!-- <select class="form-control" name="q4" formControlName="q4" >
        <option value="" selected disabled>How much can you put down?</option>
        <option value="1,000-5,000">$1,000-5,000</option>
        <option value= "5,000-1,0000">$5,000-10,000</option>
        <option value= "10,000-15,000">$10,000-15,000</option>
      </select> -->
      <button type="submit"> send</button>
      </form>
      
</div>
<!-- <div *ngIf="youngMan">
{{canView}}
</div>
<div *ngIf="showNow">{{
}}

<span class="first-name">{{nameInfo}}:</span> -->
  <!-- <span class="newsSourcescope">{{newsSource.newsSource}} </span>  -->


  <!-- <label class="radio-inline">
  <input type="radio" [value]="history" (change)="onHistory($event)"> Include Historical Records
</label> -->

