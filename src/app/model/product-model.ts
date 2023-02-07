import { SupplierModel } from './supplier-model';

export class ProductModel {
  ean: string | null | undefined = '';
  codigo: string | null | undefined = '';
  nombre: string | null | undefined = '';
  costo: number | null | undefined = 0;
  proveedor_id: number | null | undefined = 0;
  estado: number | null | undefined = 0;
}
