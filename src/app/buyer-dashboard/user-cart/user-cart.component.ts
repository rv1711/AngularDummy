import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { CartDetail } from 'src/app/helper/CartProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  cartProducts: CartDetail[];
  cartEmpty: boolean = true;
  headers: string[] = ['Name', 'Quantity', 'Price', 'Total'];
  totalCartValue: number=0;

  constructor(private requestService: RequestService,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(){
    this.requestService.getRequest("addToCart").subscribe(
      (res: CartDetail[]) => {
        console.log(res);
        this.cartProducts = res;
        if(this.cartProducts.length!=0){
          this.cartEmpty=false;
          this.calculateCartValue();
        }else{
          this.cartEmpty = true;
        }
      }
    );
  }

  checkOut(){
    this.requestService.deleteRequest("addToCart").subscribe(
      (res) => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Thanks for Shopping"
        });
        this.cartProducts=[];
        this.cartEmpty=true;
        this.totalCartValue=0;
      },
      (error: HttpErrorResponse) => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Oops, TRY Again"
        });
      }
    );
  }

  calculateCartValue(){
    for(let i = 0; i<this.cartProducts.length;i++){
      this.totalCartValue += this.cartProducts[i].quantity * (this.cartProducts[i].product.onSale ? this.cartProducts[i].product.salePrice : this.cartProducts[i].product.mrp);
    }
  }

}
