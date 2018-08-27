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
  carTopRating = [];
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

  onNews(e) {
    this.newsSource.push(e.target.value);
  }
  onCar(e) {
    this.carPicked.push(e.target.value);
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

