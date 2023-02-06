import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';
import { StockModel } from '../../model/stock-model';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  listStocks: StockModel[] = [];
  displayedColumns: string[] = ['codigoTienda', 'nombreTienda', 'codigoProducto', 'nombreProducto', 'stock', 'valorizado'];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.stockService.getStocks().subscribe(
      resp => {
        if (resp) {
          this.listStocks = resp;
        }
      }
    );
  }

}
