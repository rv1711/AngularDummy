import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { CartDetail } from 'src/app/helper/CartProduct';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyerCartService {

  totalCartProducts: number = 0;
  cartProducts: CartDetail[];
  public cartChange = new Subject<number>();


  constructor(
    private requestService: RequestService
  ) { }

  getCartItems(){
    this.totalCartProducts = 0;
    this.requestService.getRequest("addToCart").subscribe(
      (res: CartDetail[]) => {
        console.log(res);
        this.cartProducts = res;
        for(let i=0; i<this.cartProducts.length;i++){
          this.totalCartProducts += this.cartProducts[i].quantity;
        }
        this.cartChange.next(this.totalCartProducts);
      },
      (error: HttpErrorResponse) => {
        this.cartChange.next(this.totalCartProducts);
      }
    );
  }
}
