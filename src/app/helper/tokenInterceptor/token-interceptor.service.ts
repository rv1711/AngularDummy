import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>>{

    let token = localStorage.getItem('access_token');
    if(token){
      request = request.clone({
        headers: request.headers.set(
          'Authorization','Bearer '+token
        )
      })
    }
    return next.handle(request);
  }
}
