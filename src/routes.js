const express = require('express')

const routes = express.Router()

const Usuario = require('./controllers/usuarios.controller')
const Produto = require('./controllers/produtos.controller')

// Rota de Usuarios

routes.post('/api/usuarios', Usuario.create)
routes.post('/api/usuarios/login', Usuario.login)

routes.get('/', Usuario.index)
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuarios.details/:_id', Usuario.details)
routes.get('/api/usuarios/checktoken', Usuario.checkToken)
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken)

routes.delete('/api/usuarios/:_id', Usuario.delete)

routes.put('/api/usuarios', Usuario.update)

// Rota de Produtos

routes.post('/api/produtos', Produto.create)

routes.get('/api/produtos', Produto.index)
routes.get('/api/produtos.details/:_id', Produto.details)

routes.delete('/api/produtos/:_id', Produto.delete)

routes.put('/api/produtos', Produto.update)


module.exports = routes