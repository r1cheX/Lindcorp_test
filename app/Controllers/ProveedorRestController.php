<?php

namespace App\Controllers;

use App\Models\ProveedorModel;
use CodeIgniter\Controller;

class ProveedorRestController extends Controller
{

    public function findAll()
    {
        $provModel = new ProveedorModel();
        return $this->response->setStatusCode(200)->setJSON($provModel->findAll());
    }

    public function find($id)
    {
        $provModel = new ProveedorModel();
        return $this->response->setStatusCode(200)->setJSON($provModel->find($id));
    }

    public function create()
    {
        $proveedor = $this->request->getJSON();
        $provModel = new ProveedorModel();
        $provModel->insert($proveedor);
        return $this->response->setStatusCode(200)->setJSON('Proveedor creado');

    }
    public function update()
    {
        $proveedor = $this->request->getJSON();
        $provModel = new ProveedorModel();
        $provModel->update($proveedor->id, $proveedor);
        return $this->response->setStatusCode(200)->setJSON('Proveedor actualizado');
    }
    public function delete($id)
    {
        $provModel = new ProveedorModel();
        $provModel->delete($id);
        return $this->response->setStatusCode(200)->setJSON('Proveedor eliminado');
    }
}