<?php 

namespace App\Controllers;

use App\Models\ProductoModel;
use App\Models\ProveedorModel;
use CodeIgniter\Controller;

class ProductoRestController extends Controller
{

    public function findAll()
    {
        $productoModel = new ProductoModel();
        $productos = $productoModel->findAll();

        foreach ($productos as &$producto) {
            $producto = (object) $producto;
            $proveedor = $productoModel->getProveedor($producto->proveedor_id);
            $producto->proveedor = $proveedor;
            unset($producto->proveedor_id);
        }

        return $this->response->setStatusCode(200)->setJSON($productos);
    }


    public function find($id)
    {
        $productoModel = new ProductoModel();
        $producto = $productoModel->find($id);
        $producto = (object) $producto;
        $proveedor = $productoModel->getProveedor($producto->proveedor_id);
        $producto->proveedor = $proveedor;

        return $this->response->setStatusCode(200)->setJSON($producto);
    }


    public function create()
    {
        try {
            $producto = $this->request->getJSON();
            $productoModel = new ProductoModel();
            $productoModel->insert($producto);
            return $this->response->setStatusCode(200)->setJSON('Producto creado');
        } catch (\Throwable $th) {
            return $this->response->setStatusCode(500)->setJSON($th->getMessage());
        }

    }


    public function update()
    {
        $producto = $this->request->getJSON();
        $productoModel = new ProductoModel();
        $productoModel->update($producto->id, $producto);
        return $this->response->setStatusCode(200)->setJSON('Producto actualizado');
    }


    public function delete($id)
    {
        $productoModel = new ProductoModel();
        $productoModel->delete($id);
        return $this->response->setStatusCode(200)->setJSON('Producto eliminado');
    }
}