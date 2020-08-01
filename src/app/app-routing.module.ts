import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShoppingHomeComponent } from './core/shopping-home/shopping-home.component';
import { RegisterComponent } from './log/register/register.component';
import { SellerDashboardModule } from './seller-dashboard/seller-dashboard.module';
import { SigninComponent } from './log/signin/signin.component';
import { AuthGuard } from './guards/auth/auth-guard.service';
import { RoleGuard } from './guards/role/role-guard.service';


const routes: Routes = [
  /*{
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },*/
  {
    path: 'home',
    component: ShoppingHomeComponent
  },
  {
    path: 'registerUser',
    component: RegisterComponent
  },
  {
    path: 'signIN',
    component: SigninComponent
  },
  {
    path: 'seller',
    loadChildren: () => import('src/app/seller-dashboard/seller-dashboard.module').then(m => m.SellerDashboardModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'consumer',
    loadChildren: () => import('src/app/buyer-dashboard/buyer-dashboard.module').then(m => m.BuyerDashboardModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
