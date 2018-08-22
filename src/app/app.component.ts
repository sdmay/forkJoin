import { Component, OnInit } from '@angular/core';
import { ForkService } from './fork.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
  dataHolder: Array<any> = [];
  nameInfo;
  youngMan = false;
  horo;
  canView = '';
  libra = false;
  oldEnough = false;
  showNow = false;
  post = false;
  comment = false;
  constructor (private forkService: ForkService, private formBuilder: FormBuilder) {}
  ngOnInit() {
    const restTuple: [number, string, boolean] = [1, 'comments', true];
    this.registerForm = this.formBuilder.group({
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      q4: this.q4
    });
  }

  tupleFunction() {
    const postOrComment = this.registerForm.value.q1;
    const userIdNumber = +this.registerForm.value.q2;
  console.log(userIdNumber);
  
    if (this.registerForm.value.q3 === 'true') {
      this.oldEnough = true;
    }
    if (this.registerForm.value.q4 === 'true') {
        this.libra = true;
    }

    const restTuple: [number, string, boolean, boolean] = [userIdNumber, postOrComment, this.oldEnough, this.libra];

    if (restTuple[2]) {
      const postsOrComment = this.forkService.getInfo(...restTuple);
      const userName = this.forkService.getStuff(...restTuple);
      const horoscope = this.forkService.getHoro(...restTuple);
      forkJoin([postsOrComment, userName, horoscope]).subscribe(results => {

          this.dataHolder = results[0];
          console.log(results[1]);
          this.nameInfo = results[1];
          this.horo = results[2];
          this.showNow = true;
        if (this.dataHolder[0].name) {
          this.comment = true;
          this.post = false;
        }
        else {
          this.post = true;
          this.comment = false;
        }

        console.log('title: ' + this.dataHolder[0].name);
        console.log('first name: ' + this.nameInfo.first_name);
        console.log(this.horo.horo);
        this.registerForm.reset();
      });
    }
    else {
      this.canView = 'GROW UP!';
      this.youngMan = true;
      return false;
    }
  }
}
