import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockModel } from '../model/stock-model';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) {

  }

  getStocks(): Observable<StockModel[]> {
    return this.httpClient.get<StockModel[]>('http://localhost:8080/Lindcorp_test/public/api/stock/' + '/findAll').pipe(map(res => res));
  }

  saveStock(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/Lindcorp_test/public/api/stock/' + '/create', request).pipe(map(res => res));
  }

  updateStock(request: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/Lindcorp_test/public/api/stock/' + '/update', request).pipe(map(res => res));
  }

  deleteStock(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/Lindcorp_test/public/api/stock/' + '/delete/' + id).pipe(map(res => res));
  }


}
