import { Component } from '@angular/core';
import { ForkService } from './fork.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataHolder = [];
  newsSource = [];
  carData = [];
  post = false;
  carPicked = [];
  carInfo;
  rating = [];
  maybe = this.newsSource.length < 0 ? false : true;
  maybeCar = this.carPicked.length < 0 ? false : true;
  totalRating = {};
  cars = ['Ford', 'Chevrolet', 'Honda', 'Toyota'];
  topix = ['cnn', 'fox', 'forbes'];
  carRating;
  carSource;
  myArr = [];
  highestRated;
  constructor(private forkService: ForkService) { }

  onNews(e: HTMLInputElement) {
    // this.newsSource.push(e.target.value);
  }
  onCar(e: HTMLInputElement) {
    // this.carPicked.push(e.target.value);
  }
  tupleFunction() {
    this.getTuple([[...this.carPicked], [...this.newsSource]]);
  }
  getTuple(...args): void {
    this.forkService.combineInfo(args).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.carData.push(data[i]);
        this.rating.push(data[i].rating);
        this.dataHolder.push(data[i].car);
      }
      this.carInfo = new Set([...this.dataHolder]);
      this.carSource = [...this.newsSource];
      this.post = true;
      if (this.carInfo.size > 0) {
        this.myArr = Array.from(this.carInfo);
      }
      for (let c = 0; c < this.myArr.length; c++) {
        for (let d = 0; d < this.carData.length; d++) {
          let x = [];
          if (this.myArr[c] === this.carData[d].car) {
            x.push(this.carData[d].rating);
            const y = x.reduce((a, b) => a + b, 0);
            const math = y + this.carData[d].rating / d;

            this.totalRating[this.myArr[c]] = math;
            if (x.length > 0) {
              const carVals = Object.values(this.totalRating);
              const carKeys = Object.keys(this.totalRating);
              const ded = carVals.indexOf(Math.max(...carVals));
              this.highestRated = carKeys[ded];
            }
          }
          x = [];
        }
      }
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
    console.log('car data', this.carData);
    }
}

