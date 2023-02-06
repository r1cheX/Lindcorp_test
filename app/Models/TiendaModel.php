<?php

namespace App\Models;

use CodeIgniter\Model;


class TiendaModel extends Model{

    protected $table = 'tiendas';
    protected $primaryKey = 'id';
    protected $allowedFields = ['codigo', 'estado','nombre'];


}