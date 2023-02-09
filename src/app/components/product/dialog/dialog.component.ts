import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SupplierModel } from 'src/app/model/supplier-model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  listSuppliers: SupplierModel[] = [];
  productForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.listaProveedores();
    this.productForm = this.formBuilder.group({
      ean: ['', [Validators.required, Validators.minLength(13)]],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      proveedor_id: ['', [Validators.required]],
    });
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
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('Producto creado con exito');
        console.log(res);
        this.productForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        alert('Error al crear el producto');
        console.log(err);
      },
    });
  }
}
