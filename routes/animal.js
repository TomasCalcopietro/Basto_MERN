const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemaanimal = new schema({
    idSenasa: String,
    tipoAnimal: String,
    nombrePotrero: String,
    tipoDispositivo: String,
    numeroDispositivo: String,
    idanimal: String
})

const animalModel = mongoose.model('animals', schemaanimal)

//Add Animal
router.post('/addAnimal', (req, res) => {
    const newAnimal = new animalModel({
        idSenasa: req.body.idSenasa,
        tipoAnimal: req.body.tipoanimal,
        nombrePotrero: req.body.potrero,
        tipoDispositivo: req.body.dispo,
        numeroDispositivo: req.body.numdispo,
        idanimal: req.body.idanimal
    })
    newAnimal.save(function(err){
        if(!err){
            res.send('Animal agregado correctamente')
        } else {
            res.send(err)
        }
    })
})

//Get animals
router.get('/getanimals', (req, res) => {
    animalModel.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//Get animal data
router.post('/getanimaldata', (req, res) => {
    animalModel.find({idanimal: req.body.idanimal}, function(docs, err){
        if(!err){
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

// Edit Animals
router.post('/updatedanimals', (req, res) => {
    animalModel.findOneAndUpdate({idanimal:req.body.idanimal}, {
        idSenasa: req.body.idSenasa,
        tipoAnimal: req.body.tipoanimal,
        nombrePotrero: req.body.potrero,
        tipoDispositivo: req.body.dispo,
        numeroDispositivo: req.body.numdispo
    }, (err) => {
        if(!err){
            res.send('Animal actualizado correctamente')
        } else {
            res.send(err)
        }
    })
})


// Delete Animal
router.post('/deleteanimals', (req, res) => {

    animalModel.findOneAndDelete({idanimal:req.body.idanimal}, (err) => {
        if(!err){
            res.send('Animal borrado correctamente')
        } else {
            res.send(err)
        }
    })
})

      
module.exports = router;