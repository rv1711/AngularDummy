import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { MatFormFieldModule, MatInputModule, MatToolbarModule, MatDialogModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [DashboardComponent, AddProductComponent, ViewProductsComponent, SellerHeaderComponent, ProductEditComponent],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule
  ]
})
export class SellerDashboardModule { }
