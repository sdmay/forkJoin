import { Component } from '@angular/core';
import { ForkService } from './fork.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataHolder: Array<string> = [];
  newsSource: Array<string> = [];
  carData: { car: string, source: string, rating: number }[] = [];
  carPicked: Array<string> = [];
  carTopRating: Array<any> = [];
  totalRating: Object = {};
  cars: ReadonlyArray<string> = ['Ford', 'Chevrolet', 'Honda', 'Toyota'];
  sources: ReadonlyArray<string> = ['cnn', 'fox', 'forbes', 'car'];
  carSource: Array<string>;
  carNames: Array<string> = [];
  highestRated: string;
  result = false;
  carInfo;

  constructor(private forkService: ForkService) { }

  onNews(e) {
    if (this.newsSource.includes(e.target.value)) {
      this.newsSource = this.newsSource.filter(word => word !== e.target.value);
    } else {
      this.newsSource.push(e.target.value);
    }
  }
  onCar(e) {
    if (this.carPicked.includes(e.target.value)) {
      this.carPicked = this.carPicked.filter(word => word !== e.target.value);
    } else {
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
      this.carInfo = new Set(this.dataHolder);
      this.carSource = this.newsSource;
      if (this.carInfo.size > 0) {
        this.carNames = Array.from(this.carInfo);
      }
      const divide = this.carData.length / this.carNames.length;
      for (let c = 0; c < this.carNames.length; c++) {
        let x = 0;
        for (let d = 0; d < this.carData.length; d++) {
          if (this.carNames[c] === this.carData[d].car) {
            x += this.carData[d].rating;
          }
        }
        this.totalRating[this.carNames[c]] = x / divide;
      }
      const carVals = Object.values(this.totalRating);
      const carKeys = Object.keys(this.totalRating);
      for (let r = 0; r < carVals.length; r++) {
        this.carTopRating.push(carVals[r]);
      }
      let max = 0;
      for (let z = 0; z < this.carTopRating.length; z++) {
        // TO DO: ADD A CATCH FOR TIE SCORES
        if (this.carTopRating[z] > max) {
          max = this.carTopRating[z];
        }
      }
      const maxCarRating = this.carTopRating.indexOf(max);
      this.highestRated = carKeys[maxCarRating];
      this.newsSource = [];
      this.carPicked = [];
      this.result = true;
    });
  }
  compareMore() {
    this.result = false;
    this.dataHolder = [];
    this.highestRated = '';
    this.carData = [];
    this.totalRating = {};
    this.carNames = [];
    this.carSource = [];
    this.carInfo = [];
    this.carTopRating = [];
  }
}

