import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequest(endPoint: string, id: string='') {
    let url = environment.apiUrl + environment[endPoint]+id;
    return this.http.get(url);
  }

  postRequest(endPoint: string, postBody: any) {
    let url = environment.apiUrl + environment[endPoint];
    return this.http.post(url, postBody);
  }

  putRequest(endPoint: string, id: string, putBody: any) {
    let url = environment.apiUrl + environment[endPoint] + id;
    return this.http.put(url, putBody);
  }

  deleteRequest(endPoint: string, body?: any) {
    let url = environment.apiUrl + environment[endPoint];
    console.log(body);
    if (body) {
      const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body }
      return this.http.delete(url, options);
    }
    return this.http.delete(url);
  }

}
