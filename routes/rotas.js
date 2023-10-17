const { Router } = require('express');

const { rotasBairros } = require('./rotasBairros');

const { rotasAcontecimentos} = require('./rotasAcontecimentos');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasBairros);
rotas.use(rotasAcontecimentos);

module.exports = rotas;