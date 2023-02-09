import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { ProductModel } from '../../model/product-model';
import { SupplierModel } from '../../model/supplier-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  listProducts: ProductModel[] = [];

  displayedColumns: string[] = [
    'ean',
    'proveedor',
    'codigo',
    'nombre',
    'costo',
    'acciones',
  ];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.productService.getProducts().subscribe((resp) => {
      if (resp) {
        this.listProducts = resp;
      }
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // editProduct(
  //   id: number,
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(DialogComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  // async deleteProduct(id: number) {
  //    this.productService.deleteProduct(id).subscribe(
  //     (resp) => {
  //       if (resp) {
  //         this.ngOnInit();
  //         this.router.navigate(['productos']);
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}


