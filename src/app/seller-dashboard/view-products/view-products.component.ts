import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/helper/ProductResponse';
import { SellerHeaderService } from '../service/seller-header.service';

// interface CategoryProduct{
//   name: string;
// };
// interface Product{
//   _id: string,
//   name: string,
//   mrp: number,
//   salePrice: number,
//   quantity: number,
//   onSale: boolean,
//   category: CategoryProduct
// };

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  userProducts: Product[];
  headers: string[] = ['Name', 'MRP', 'Quantity', 'Category', 'OnSale', 'SalePrice'];
  productAvl: boolean = false;

  constructor(private requestService: RequestService,
    private router: Router,
    private sellerService: SellerHeaderService) { }

  ngOnInit() {
    this.getProductUser();
  }

  getProductUser(){
    this.requestService.getRequest("viewSellerDashboard").subscribe(
      (res: Product[]) => {
        this.userProducts = res;
        if(this.userProducts.length!=0){
          this.productAvl = true;
        }
        else{
          this.productAvl = false;
        }
      }
    );
  }

  onDelete(product: Product){
    const id = [
      product._id
    ]
    this.requestService.deleteRequest("deleteProductAdmin",id).subscribe(
      (res)=>{
        this.getProductUser();
        this.sellerService.getAllProducts();
      }
    );
  }

  onEdit(product: Product){
    let url= 'editProduct/'+product._id;
    this.router.navigate([url]);
    // (click)="onEdit(userProduct)"
  }

}
