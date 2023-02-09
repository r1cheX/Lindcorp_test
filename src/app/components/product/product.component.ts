import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'ean',
    'proveedor',
    'codigo',
    'nombre',
    'costo',
    'acciones',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    }).afterClosed().subscribe(val =>{
      if (val === 'save'){
        this.list();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === 'update'){
        this.list();
      }
    });
  }

  async deleteProduct(id: number) {
     this.productService.deleteProduct(id).subscribe(
      (resp) => {
        if (resp) {
          // alert('Producto eliminado con exito');
          this.list();
        }
      },
      (error) => {
        alert('Error al eliminar el producto');
      }
    );
  }
}
