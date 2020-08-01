import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/service/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { BuyerCartService } from '../service/buyer-cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  addCartQty: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    public dialog: MatDialog,
    private buyerService: BuyerCartService
  ) { }

  ngOnInit() {

    this.addCartQty = this.formBuilder.group({
      qty: [null, [Validators.required, Validators.min(1), Validators.max(2)]]
    });
  }

  addToCart(){
    const cartAddBody = {
      "quantity": this.addCartQty.get('qty').value,
      "product": this.data
    };

    this.requestService.postRequest("addToCart",cartAddBody).subscribe(
      (res) => {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Item Added to Cart"
        });
        this.buyerService.getCartItems();
      },
      (error: HttpErrorResponse) => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Item Not Added to Cart"
        });
      }
    );
  }


}
