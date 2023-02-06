<?php

namespace App\Models;

use CodeIgniter\Model;


class ProductoModel extends Model
{

    protected $table = 'productos';
    protected $primaryKey = 'id';

    protected $allowedFields = ['codigo', 'costo', 'ean', 'estado', 'nombre', 'proveedor_id'];

    public function getProveedor($proveedor_id)
    {
        return $this->db->table('proveedores')
            ->select('proveedores.*')
            ->where('proveedores.id', $proveedor_id)
            ->get()->getRow();
    }


}