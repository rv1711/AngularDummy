import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/helper/ProductResponse';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

interface OnSale {
  display: string,
  value: boolean
};

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  editProductForm: FormGroup;
  id: string;
  onSales: OnSale[];

  constructor(private requestService: RequestService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.onSales = [
      { display: "Yes", value: true },
      { display: "No", value: false },
    ];

    this.editProductForm = this.formBuilder.group({
      productName: ["", Validators.required],
      description: ["", Validators.required],
      category: [null, Validators.required],
      mrp: [null, [Validators.required, Validators.min(1)]],
      onSale: [null, Validators.required],
      saleprice: [null, Validators.min(1)],
      qty: [null, [Validators.required, Validators.min(1)]],
    });
    this.initialValue();
  }

  initialValue() {
    this.requestService.getRequest("getProductDetail", this.id).subscribe(
      (res: Product) => {
        console.log(res.category.name);
        this.editProductForm.patchValue({
          productName: res.name,
          category: res.category.name,
          mrp: res.mrp,
          onSale: res.onSale,
          saleprice: res.salePrice,
          qty: res.quantity,
        });
      }
    );

    this.editProductForm.disable();
    this.editProductForm.get('onSale').enable();
    this.editProductForm.get('saleprice').enable();
    this.editProductForm.get('qty').enable();

  }

  get f() {
    return this.editProductForm.controls;
  }

  onEdit(){
    const putBody = {
      "salePrice": this.f.saleprice.value,
      "quantity":this.f.qty.value,
      "onSale": this.f.onSale.value
    };

    console.log(putBody);

    this.requestService.putRequest("editProduct", this.id, putBody).subscribe(
      (res) => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Success"
        });
        this.initialValue();
      },
      (error: HttpErrorResponse) => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,{
          data : "Failed"
        });
      }
    );
    
  }

}
