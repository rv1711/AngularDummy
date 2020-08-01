import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ShoppingHomeComponent } from './core/shopping-home/shopping-home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './log/register/register.component';
import { SigninComponent } from './log/signin/signin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LogoutDialogComponent } from './log/logout-dialog/logout-dialog.component';
import { SuccessDialogComponent } from './core/success-dialog/success-dialog.component';
import {MatRadioModule} from '@angular/material/radio'; 
import { SellerDashboardModule } from './seller-dashboard/seller-dashboard.module';
import { TokenInterceptor } from './helper/tokenInterceptor/token-interceptor.service';
import { AuthGuard } from './guards/auth/auth-guard.service';
import { RoleGuard } from './guards/role/role-guard.service';
import { AddToCartComponent } from './buyer-dashboard/add-to-cart/add-to-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HomeComponent,
    ShoppingHomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    SigninComponent,
    LogoutDialogComponent,
    SuccessDialogComponent,
    AddToCartComponent
  ],
  entryComponents: [
    SigninComponent,
    LogoutDialogComponent,
    SuccessDialogComponent,
    AddToCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080','localhost:3000'],
        blacklistedRoutes:[]
      }
    }),
    MatRadioModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
