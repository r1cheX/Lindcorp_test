<?php

namespace App\Controllers;

use Codeigniter\Controller;

class OptionsController extends Controller
{

    public function options()
    {
        return $this->response->setHeader('Access-Control-Allow-Origin', '*')
            ->setHeader('Access-Control-Allow-Headers', '*')
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    }

}