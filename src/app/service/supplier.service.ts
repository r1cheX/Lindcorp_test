import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierModel } from '../model/supplier-model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  
  constructor(private httpClient: HttpClient) {

  }

  getSuppliers(): Observable<SupplierModel[]> {
    return this.httpClient
      .get<SupplierModel[]>(
        'http://localhost:8080/Lindcorp_test/public/api/proveedor/' + '/findAll'
      )
      .pipe(map((res) => res));
  }

  saveSupplier(request: any): Observable<any> {
    return this.httpClient
      .post<any>(
        'http://localhost:8080/Lindcorp_test/public/api/proveedor/' + '/create',
        request
      )
      .pipe(map((res) => res));
  }

  updateSupplier(request: any): Observable<any> {
    return this.httpClient
      .post<any>(
        'http://localhost:8080/Lindcorp_test/public/api/proveedor/' + '/update',
        request
      )
      .pipe(map((res) => res));
  }

  deleteSupplier(id: number): Observable<any> {
    return this.httpClient
      .get<any>(
        'http://localhost:8080/Lindcorp_test/public/api/proveedor/' +
          '/delete/' +
          id
      )
      .pipe(map((res) => res));
  }
}
