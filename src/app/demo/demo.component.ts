import { Component, OnInit, Input } from '@angular/core';
import { ObservService } from '../observ.service';
import { of } from 'rxjs';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @Input() showValue: boolean = true;
  lenStr: number;
  today: number = Date.now();
  
  selectedValue: string;
  selectedCar: string;

  constructor(private observService: ObservService) { }

  ngOnInit() {
    this.observService.getValues().subscribe(res=>{
      console.log(res);
    });

    this.observService.doAsyncTask().then(
      (val) => console.log(val),
      (err) => console.error(err)
    );

    console.log("In Demo");

    this.checkSub();
  }
  
  checkSub(){
    this.observService.obsSubject.subscribe(res=>{
      console.log("In Demo",res);
    });
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];

}
