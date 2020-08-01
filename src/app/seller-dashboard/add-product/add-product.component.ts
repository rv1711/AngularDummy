import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SellerHeaderService } from '../service/seller-header.service';

interface Category {
  _id: string,
  name: string,
  user: string,
  __v: number
};

interface OnSale {
  display: string,
  value: boolean
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: Category[];
  addProductForm: FormGroup;
  onSales: OnSale[];
  constructor(
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private sellerService: SellerHeaderService
  ) { }

  ngOnInit() {
    this.getProducts();

    this.addProductForm = this.formBuilder.group({
      productName: ["", Validators.required],
      description: ["", Validators.required],
      category: [null, Validators.required],
      mrp: [null, [Validators.required, Validators.min(1)]],
      onSale: [null, Validators.required],
      saleprice: [null, Validators.min(1)],
      qty: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onAdd() {
    const addBody = {
      "name": this.f.productName.value,
      "description": this.f.description.value,
      "category": this.f.category.value,
      "mrp": this.f.mrp.value,
      "salePrice": this.f.saleprice.value,
      "quantity": this.f.qty.value,
      "onSale": this.f.onSale.value
    };
    console.log(addBody);

    this.requestService.postRequest("addProduct", addBody).subscribe((res)=>{
      console.log("Added");
      const dialogRef = this.dialog.open(SuccessDialogComponent,{
        data : "Success"
      });
      this.addProductForm.reset();
      this.sellerService.getAllProducts();
    });
  }
  get f() {
    return this.addProductForm.controls;
  }

  getProducts() {
    this.onSales = [
      { display: "Yes", value: true },
      { display: "No", value: false },
    ];

    this.requestService.getRequest("getProductCategory").subscribe((res: Category[]) => {
      this.categories = res;
      console.log(this.categories);
    });
  }

}
