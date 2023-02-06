<?php

namespace App\Models;

use CodeIgniter\Model;


class StockModel extends Model
{

    protected $table = 'stocks';
    protected $primaryKey = 'id';

    protected $allowedFields = ['estado', 'stock', 'valorizado', 'producto_id', 'tienda_id'];

    public function getProducto($producto_id)
    {
        return $this->db->table('productos')
            ->select('productos.*')
            ->where('productos.id', $producto_id)
            ->get()->getRow();
    }
    public function getTienda($tienda_id)
    {
        return $this->db->table('tiendas')
            ->select('tiendas.*')
            ->where('tiendas.id', $tienda_id)
            ->get()->getRow();
    }


}