import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerDashboardRoutingModule } from './buyer-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyerHeaderComponent } from './buyer-header/buyer-header.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';


@NgModule({
  declarations: [DashboardComponent, BuyerHeaderComponent, UserCartComponent, ProductViewComponent, BuyerHomeComponent],
  imports: [
    CommonModule,
    BuyerDashboardRoutingModule
  ]
})
export class BuyerDashboardModule { }
