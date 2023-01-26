import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ProductModel } from '../../model/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProducts: ProductModel[] = [];
  displayedColumns: string[] = ['ean', 'proveedor', 'codigo', 'nombre', 'costo'];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.productService.getProducts().subscribe(
      resp => {
        if (resp) {
          this.listProducts = resp;
        }
      }
    );
  }

}


