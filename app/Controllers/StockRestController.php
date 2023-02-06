<?php

namespace App\Controllers;

use App\Models\StockModel;
use CodeIgniter\Controller;

class StockRestController extends Controller
{
    public function findAll()
    {
        $stockModel = new StockModel();
        $stocks = $stockModel->findAll();

        foreach ($stocks as &$stock) {
            $stock = (object) $stock;
            $producto = $stockModel->getProducto($stock->producto_id);
            $tienda = $stockModel->getTienda($stock->tienda_id);
            $stock->producto = $producto;
            $stock->tienda = $tienda;
            unset($stock->producto_id);
            unset($stock->tienda_id);
        }

        return $this->response->setStatusCode(200)->setJSON($stocks);
    }

    public function find($id)
    {
        $stockModel = new StockModel();
        $stock = $stockModel->find($id);
        $stock = (object) $stock;
        $producto = $stockModel->getProducto($stock->producto_id);
        $tienda = $stockModel->getTienda($stock->tienda_id);
        $stock->producto = $producto;
        $stock->tienda = $tienda;
        unset($stock->producto_id);
        unset($stock->tienda_id);

        return $this->response->setStatusCode(200)->setJSON($stock);
    }

    public function create()
    {
        $stock = $this->request->getJSON();
        $stockModel = new StockModel();
        $stockModel->insert($stock);
        return $this->response->setStatusCode(200)->setJSON('Stock creado');
    }

    public function update()
    {
        $stock = $this->request->getJSON();
        $stockModel = new StockModel();
        $stockModel->update($stock->id, $stock);
        return $this->response->setStatusCode(200)->setJSON('Stock actualizado');
    }

    public function delete($id)
    {
        $stockModel = new StockModel();
        $stockModel->delete($id);
        return $this->response->setStatusCode(200)->setJSON('Stock eliminado');
    }
}