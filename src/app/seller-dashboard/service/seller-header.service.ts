import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/helper/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class SellerHeaderService {

  totalUserProducts: number = 0;
  totalSaleProducts: number = 0 ;
  public userProduct = new Subject<number>();
  public saleProduct = new Subject<number>();
  userProducts: Product[] = [];

  constructor(private requestService: RequestService) { }

  getAllProducts(){
    this.totalUserProducts=0;
    this.totalSaleProducts=0;
    this.requestService.getRequest("viewSellerDashboard").subscribe(
      (res: Product[]) => {
        this.userProducts = res;
        this.totalUserProducts = this.userProducts.length;
        for(let i = 0; i<this.totalUserProducts;i++){
          if(this.userProducts[i].onSale){
            this.totalSaleProducts++;
          }
        }
        this.userProduct.next(this.totalUserProducts);
        this.saleProduct.next(this.totalSaleProducts);
      }
    );
  }
}
