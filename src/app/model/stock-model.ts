import { ProductModel } from './product-model';
import { TiendaModel } from './tienda-model';

export class StockModel {
    id: number = 0;
    estado: number = 0;
    stock: number = 0;
    valorizado: number = 0;
    producto: ProductModel = new ProductModel();
    tienda: TiendaModel = new TiendaModel();
}