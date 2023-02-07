import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { ProductModel } from '../../model/product-model';
import { SupplierModel } from '../../model/supplier-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  ];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
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
    this.dialog.open(ProductComponentDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: 'product.dialog.html',
  styleUrls: ['./product.dialog.css'],
})
export class ProductComponentDialog implements OnInit {
  listSuppliers: SupplierModel[] = [];

  numberValidator(control: FormControl) {
    if (isNaN(control?.value)) {
      return {
        number: true,
      };
    }
    return null;
  }

  form = new FormGroup({
    ean: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(5),
    ]),
    codigo: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.maxLength(10),
    ]),
    nombre: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    costo: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      this.numberValidator,
    ]),
    proveedor_id: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    estado: new FormControl({ value: 1, disabled: false }, [
      Validators.required,
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<ProductComponentDialog>,
    private supplierService: SupplierService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listaProveedores();
  }

  listaProveedores() {
    this.supplierService.getSuppliers().subscribe((resp) => {
      if (resp) {
        this.listSuppliers = resp;
        console.log('PROVEEDORES--->' + this.listSuppliers);
      }
    });
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    console.log('data------->', data);

    this.productService.saveProduct(data).subscribe(
      (resp) => {
        if (resp) {
          this.router.navigate(['/product']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
