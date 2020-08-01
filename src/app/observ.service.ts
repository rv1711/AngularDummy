import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservService {

  timeLeft: number = 2;
  interval;
  names: string[] = ['Adam','Jio','New'];
  error: boolean = true;

  public obsSubject = new Subject<boolean>();

  constructor() { }

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  getValues(){
    return of(this.names);
  }

doAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (this.error) {
        reject('error'); // pass values
      } else {
        resolve('Resolved'); // pass values
      }
    }, 2000);
  });
}

changeValInSub(val: boolean){
  this.obsSubject.next(val);
}

}
