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
    return this.httpClient.get<ProductModel[]>('http://localhost/codeigniter/backend_test/public/api/producto/' + '/findAll').pipe(map(res=>res));
  }

  saveProduct(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost/codeigniter/backend_test/public/api/producto/' + '/create', request).pipe(map(res=>res));
  }

  updateProduct(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost/codeigniter/backend_test/public/api/producto/' + '/update', request).pipe(map(res=>res));
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost/codeigniter/backend_test/public/api/producto/' + '/delete/' + id).pipe(map(res=>res));
  }

}
