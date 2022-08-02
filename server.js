const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')
const routes = require('./src/routes')

const app = express()
const port = process.env.PORT || 5000

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/teppa', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error(err))

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(routes)

app.listen(port, function () {
    console.log(`Servidor Iniciado na porta ${port}`)
})