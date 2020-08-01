import { Component, OnInit } from '@angular/core';
import { ProductBuyer } from 'src/app/helper/AllProducts';
import { RequestService } from 'src/app/service/request.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-home',
  templateUrl: './shopping-home.component.html',
  styleUrls: ['./shopping-home.component.css']
})
export class ShoppingHomeComponent implements OnInit {

  products: ProductBuyer[];

  constructor(private requestService: RequestService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    this.getProducts();

    if(this.authService.isLoggedIn()){
      this.navToUrl();
    }
  }

  getProducts(){
    this.requestService.getRequest("getProducts").subscribe(
      (res: ProductBuyer[]) => {
        this.products = res;
      }
    );
  }

  navToUrl(){
    let role: string;
      role = this.authService.currentUser.role;
      console.log("Role", role);
      
      if(role === "admin"){
        this.route.navigate(['seller']);
      }
      else{
        this.route.navigate(['consumer']);
      }
  }

}
