const express = require('express')
const router = express.Router()

const colaboradores = require('../seeding/ColaboradorSeeding.json')
const tareas = require('../seeding/TareaSeeding.json')

const Colaborador = require('../models/ColaboradorModel')
const Tarea = require('../models/TareaModel')

router.get('/', async (req, res) => {
    try{

        await Colaborador.deleteMany()
        await Tarea.deleteMany()
        await Colaborador.insertMany(colaboradores)
        await Tarea.insertMany(tareas)

        res.send('Data seeded')
    } catch (error){
        res.status(500).send(error)
    }
})


module.exports = router