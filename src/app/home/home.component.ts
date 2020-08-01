import { Component, OnInit } from '@angular/core';
import { ObservService } from '../observ.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  val: boolean = false;
  showVal: string = "Enable";
  items: number[] = [1,2,3,4];
  Switch_Expression: string;

  constructor(private observService: ObservService) { }

  ngOnInit() {
    /* this.observService.obsSubject.subscribe((res)=>{
      console.log("Val from Subject: ",res);
    }); */
  }
  changeVal(){
    this.val = !this.val;
    console.log(this.val);
    this.observService.changeValInSub(this.val);
  }
  pushVal(){
    this.items.push(this.items.length+1);
  }

}
