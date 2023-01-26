import { SupplierModel } from './supplier-model';

export class ProductModel {
    id: number = 0;
    ean: string = '';
    codigo: string = '';
    nombre: string = '';
    costo: number = 0;
    proveedor: SupplierModel = new SupplierModel();
    estado: number = 0;
}