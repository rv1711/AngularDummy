import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/helper/ProductResponse';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute } from '@angular/router';
import { ProductBuyer } from 'src/app/helper/AllProducts';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products: ProductBuyer[];
  product: ProductBuyer;
  id: string;

  constructor(private requestService: RequestService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductAll();
  }

  getProductAll() {
    this.requestService.getRequest("getProducts").subscribe(
      (res: ProductBuyer[]) => {
        this.products = res;
        this.getProduct();
      }
    );
  }

  getProduct(){
    for(let i=0; i<this.products.length;i++){
      if(this.products[i]._id==this.id){
        this.product = this.products[i];
      }
    }
  }

  openAddCart(product: ProductBuyer){
    const dialogRef = this.dialog.open(AddToCartComponent,
      {
        data: product._id
      });
  }

}
