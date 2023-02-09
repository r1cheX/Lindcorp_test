import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierModel } from 'src/app/model/supplier-model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  listSuppliers: SupplierModel[] = [];
  productForm!: FormGroup;
  actionBtn: string = 'Crear';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any
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

    if (this.editData) {
      this.actionBtn = 'Editar';
      console.log(this.editData);
      this.productForm.patchValue(this.editData);
      this.productForm.controls['proveedor_id'].setValue(
        this.editData.proveedor.id
      );
      this.productForm.addControl('id', new FormControl(''));
      this.productForm.controls['id'].setValue(this.editData.id);
      console.log(this.productForm.value);
    }
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
    if (!this.editData) {
      this.productService.saveProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Producto creado con exito');
          console.log(res);
          this.productForm.reset();
          this.dialogRef.close("save");
        },
        error: (err) => {
          alert('Error al crear el producto');
          console.log(err);
        },
      });
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productService.updateProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('Producto actualizado con exito');
        console.log(res);
        this.productForm.reset();
        this.dialogRef.close("update");
      },
      error: (err) => {
        alert('Error al actualizar el producto');
        console.log(err);
      },
    });
  }
}
