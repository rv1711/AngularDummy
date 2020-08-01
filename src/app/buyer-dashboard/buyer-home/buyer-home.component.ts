import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { ProductBuyer } from 'src/app/helper/AllProducts';
import { Router } from '@angular/router';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.css']
})
export class BuyerHomeComponent implements OnInit {

  products: ProductBuyer[];

  constructor(
    private requestService: RequestService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.requestService.getRequest("getProducts").subscribe(
      (res: ProductBuyer[]) => {
        this.products = res;
      }
    );
  }

  productView(product: ProductBuyer){
    console.log(product);
    this.router.navigate(['..','viewproduct',product._id]);
  }

  openAddCart(product: ProductBuyer){
    const dialogRef = this.dialog.open(AddToCartComponent,
      {
        data: product._id
      });
  }

}
