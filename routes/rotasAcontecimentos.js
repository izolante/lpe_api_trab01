const { Router } = require('express');

const {  getAcontecimentos, addAcontecimento, updateAcontecimento, deleteAcontecimento, getAcontecimentoPorCodigo } = require('../controllers/acontecimentoController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasAcontecimentos = new Router();

rotasAcontecimentos.route('/acontecimento')
   .get(verificaJWT , getAcontecimentos)
   .post(verificaJWT , addAcontecimento)
   .put(verificaJWT , updateAcontecimento)

rotasAcontecimentos.route('/acontecimento/:codigo')
   .get(verificaJWT , getAcontecimentoPorCodigo)
   .delete(verificaJWT , deleteAcontecimento)

module.exports = { rotasAcontecimentos };