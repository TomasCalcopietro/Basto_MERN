const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.ncqgl26.mongodb.net/?retryWrites=true&w=majority')

const objectbd = mongoose.connection

objectbd.on('connected', () => {console.log('Conexion correcta a MongoDB')})
objectbd.on('error', () => {console.log('Error en la conexion a MongoDB')})

module.exports = mongoose

