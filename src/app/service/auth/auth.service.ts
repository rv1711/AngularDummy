import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { loginResponse } from 'src/app/helper/login';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestService: RequestService,
    private jwtHelperService: JwtHelperService) { }

  login(credentials: string) { 
    /*this.requestService.postRequest("loginUser",credentials).subscribe((res: loginResponse)=>{
      localStorage.setItem('access_token', res.access_token);
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
    });*/
    localStorage.setItem('access_token', credentials);
   }
 
   logout() { 
     localStorage.removeItem('access_token');
     window.location.reload();
   }
 
   isLoggedIn() { 

     let token = localStorage.getItem('access_token');
 
     if(!token)
       return false;
 
     let expirationTime = this.jwtHelperService.getTokenExpirationDate(token);
     let isExpired = this.jwtHelperService.isTokenExpired(token);
     return !isExpired;
   }
 
   get currentUser(){
     let token = localStorage.getItem('access_token');
 
     if(!token)
       return null;
 
     return this.jwtHelperService.decodeToken(token);
   }
}
