import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { 

  }

  url = 'http://localhost:8080/Lindcorp_test/public/api/producto/';


  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.url + '/findAll').pipe(map(res=>res));
  }

  saveProduct(request: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/create', request).pipe(map(res=>res));
  }

  updateProduct(request: any): Observable<any> {
    return this.httpClient.put<any>(this.url + '/update', request).pipe(map(res=>res));
  }

  findProductById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/findById/' + id).pipe(map(res=>res));
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/delete/' + id).pipe(map(res=>res));
  }

}
