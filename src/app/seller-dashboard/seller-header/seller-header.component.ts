import { Component, OnInit } from '@angular/core';
import { SellerHeaderService } from '../service/seller-header.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent implements OnInit {

  productCount: number = 0;
  saleProductCount: number = 0;

  constructor(
    private sellerService: SellerHeaderService
  ) { }

  ngOnInit() {
    this.sellerService.getAllProducts();
    this.sellerService.userProduct.subscribe(
      (res: number) => {
        this.productCount=res;
      }
    );
    this.sellerService.saleProduct.subscribe(
      (res: number) => {
        this.saleProductCount = res;
      }
    );
  }

}
