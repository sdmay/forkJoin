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
  horo = [];
  decadePicked = [];
  canView = '';
  libra = false;
  oldEnough = false;
  showNow = false;
  post = false;
  carPicked = [];
  allOfIt;
  carInfo;
  rating = [];
  comment = false;
  maybe = this.horo.length < 0 ? false : true;
  maybeCar = this.carPicked.length < 0 ? false : true;

  cars = ['Ford', 'Chevrolet', 'Honda', 'Toyota'];
  topix = ['cnn', 'fox', 'forbes'];
  decade = [1999, 2000, 2001, 2003];
  carRating;
  carSource;
  constructor (private forkService: ForkService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.forkService.getNews(...this.cars).subscribe(data => {
      console.log(data);
      // this.decadePicked = data;
    });
        this.registerForm = this.formBuilder.group({
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      q4: this.q4
    });
  }
onChange(e: HTMLInputElement) {
  this.horo.push(e.target.value);
  console.log(this.horo);
}
// onClick(e: HTMLInputElement) {
//   this.decadePicked.push(e.target.value);
// }
onSubject(e: HTMLInputElement) {
  this.decadePicked.push(e.target.value);
  console.log(this.decadePicked);
}
onBand(e: HTMLInputElement) {
  this.carPicked.push(e.target.value);
  console.log(this.carPicked);
}
  tupleFunction() {
    const postOrComment = this.registerForm.value.q1;
    this.registerForm.value.q2 = +this.registerForm.value.q2;
    if (this.registerForm.value.q3 === 'true') {
      this.registerForm.value.q3 = true;
    }
    else {
      this.registerForm.value.q3 = false;
    }
    if (this.registerForm.value.q4 === 'true') {
      this.registerForm.value.q4 = true;
    }
    else {
      this.registerForm.value.q4 = false;
    }

  // console.log(this.horo);
  this.getTuple('Name', 'email', [[...this.carPicked], [...this.horo]]);
  }
 getTuple(name, email, ...args): void {
   this.decadePicked = [];
   this.horo = [];
      this.forkService.combineInfo(args).subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++ ) {
          this.decadePicked.push(data[i]);
          this.rating.push(data[i].rating);
          this.dataHolder.push(data[i].car);
          // this.carSource.push({
          //   'source': data[i].source,
          //   'rating': data[i].rating,
          //   'car': data[i].car
          // });
        }
        this.carInfo = new Set([...this.dataHolder]);
        this.carRating = new Set([...this.rating]);
        // this.carSource = new Set([...this.decadePicked]);
        this.post = true;
        // this.allOfIt = [this.carInfo, this.rating, this.carSource];
        // for (let i = 0; i < this.decadePicked.length; i++ ) {
        //   this.carInfo.push(this.decadePicked[i]);
        // }
        // console.log(this.carInfo);
        console.log(this.decadePicked);
      });
        // this.dataHolder.push(data);
        this.nameInfo = name;
        this.showNow = true;
        this.horo = [];

    }
  }

