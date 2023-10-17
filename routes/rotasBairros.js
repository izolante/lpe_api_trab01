const { Router } = require('express');

const { getBairros, addBairro, updateBairro, deleteBairro, getBairroPorCodigo } = require('../controllers/bairroController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasBairros = new Router();

rotasBairros.route('/bairro')
   .get(verificaJWT , getBairros)
   .post(verificaJWT , addBairro)
   .put(verificaJWT , updateBairro)

rotasBairros.route('/bairro/:codigo')
   .get(verificaJWT , getBairroPorCodigo)
   .delete(verificaJWT , deleteBairro)

module.exports = { rotasBairros };