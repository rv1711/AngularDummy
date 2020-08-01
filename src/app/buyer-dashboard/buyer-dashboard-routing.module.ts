import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UserCartComponent } from './user-cart/user-cart.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'buyerHome',
        component: BuyerHomeComponent
      },
      {
        path: 'viewproduct/:id',
        component: ProductViewComponent
      },
      {
        path: 'userCart',
        component: UserCartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerDashboardRoutingModule { }
