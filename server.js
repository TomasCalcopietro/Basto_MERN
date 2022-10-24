const express = require('express')
const app = express()

// Importar conexión mongo
const fileBD = require('./connection.js')

// Importacion del archivo de rutas y modelo animal
const rutaAnimal = require('./routes/animal')

// Importacion body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))

app.use('/api/animal', rutaAnimal)

 app.get('/', (req, res) => {
    res.end('Bienvenidos al servidor backend Node.js. Corriendo...')
 })

 //Configurar server básico
 app.listen(5000, function(){
    console.log('El servidor está corriendo correctamente')
 })