import { Component, OnInit } from '@angular/core';
import { BuyerCartService } from '../service/buyer-cart.service';

@Component({
  selector: 'app-buyer-header',
  templateUrl: './buyer-header.component.html',
  styleUrls: ['./buyer-header.component.css']
})
export class BuyerHeaderComponent implements OnInit {

  cartItems: number =0;

  constructor(private buyerService: BuyerCartService) { }

  ngOnInit() {
    this.buyerService.getCartItems();
    this.buyerService.cartChange.subscribe((res: number)=>{
      this.cartItems = res;
    });
  }

}
