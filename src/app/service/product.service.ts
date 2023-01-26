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


  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>('http://localhost:8080/api/producto' + '/list').pipe(map(res=>res));
  }

  saveProduct(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/producto' + '/save', request).pipe(map(res=>res));
  }

  updateProduct(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/producto' + '/update', request).pipe(map(res=>res));
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/producto' + '/delete/' + id).pipe(map(res=>res));
  }

}
