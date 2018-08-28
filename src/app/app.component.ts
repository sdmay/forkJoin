import { Component } from '@angular/core';
import { ForkService } from './fork.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataHolder: Array<string> = [];
  newsSource: Array<string> = [];
  carData: { car: string, source: string, rating: number }[] = [];
  post = false;
  carPicked: Array<string> = [];
  carTopRating: Array<any> = [];
  maybeNews = this.newsSource.length < 0 ? false : true;
  maybeCar = this.carPicked.length < 0 ? false : true;
  totalRating: Object = {};
  cars: ReadonlyArray<string> = ['Ford', 'Chevrolet', 'Honda', 'Toyota'];
  topics: ReadonlyArray<string> = ['cnn', 'fox', 'forbes', 'car'];
  carSource: Array<string>;
  myArr: Array<string> = [];
  highestRated: string;
  carInfo;

  constructor(private forkService: ForkService) { }

  onNews(e) {
    if (this.newsSource.includes(e.target.value)) {
      this.newsSource = this.newsSource.filter(word => word !== e.target.value);
    }
    else {
      this.newsSource.push(e.target.value);
    }
  }
  onCar(e) {
    if (this.carPicked.includes(e.target.value)) {
      this.carPicked = this.carPicked.filter(word => word !== e.target.value);
    }
    else {
      this.carPicked.push(e.target.value);
    }
  }
  carReview() {
    this.getCarReviews(this.carPicked, this.newsSource);
  }
  getCarReviews(cars: Array<string>, sources: Array<string>): void {

    this.forkService.combineInfo(cars, sources).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.carData.push(data[i]);
        this.dataHolder.push(data[i].car);
      }
      this.carInfo = new Set([...this.dataHolder]);
      this.carSource = [...this.newsSource];
      this.post = true;
      if (this.carInfo.size > 0) {
        this.myArr = Array.from(this.carInfo);
      }
      const divide = this.carData.length / this.myArr.length;
      for (let c = 0; c < this.myArr.length; c++) {
        let x = 0;
        for (let d = 0; d < this.carData.length; d++) {
          if (this.myArr[c] === this.carData[d].car) {
            x += this.carData[d].rating;
          }
        }
        this.totalRating[this.myArr[c]] = x / divide;
      }
      const carVals = Object.values(this.totalRating);
      const carKeys = Object.keys(this.totalRating);
      for (let r = 0; r < carVals.length; r++) {
        this.carTopRating.push(carVals[r]);
      }
      let max = 0;
      for (let z = 0; z < this.carTopRating.length; z++) {
        if (this.carTopRating[z] > max) {
          max = this.carTopRating[z];
        }
      }
      const zippy = this.carTopRating.indexOf(max);
      this.highestRated = carKeys[zippy];
      this.newsSource = [];
      this.carPicked = [];
    });
  }
  compareMore() {
    this.post = false;
    this.dataHolder = [];
    this.highestRated = '';
    this.carData = [];
    this.totalRating = {};
    this.myArr = [];
    this.carSource = [];
    this.carInfo = [];
    this.carTopRating = [];
  }
}

