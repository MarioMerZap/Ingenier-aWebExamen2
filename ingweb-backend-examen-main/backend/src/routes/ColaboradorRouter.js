const express = require('express')
const router = express.Router()

const colaboradorController = require('../controllers/ColaboradorController')

router.get('/', colaboradorController.getAllColaboradores)
router.post('/', colaboradorController.createColaborador)

router.get('/:id/habilidades', colaboradorController.getColaboradorHabilidades)
router.post('/:id/habilidades', colaboradorController.addHabilidad)
router.delete('/:id/habilidades/:habilidad', colaboradorController.deleteHabilidad)

router.get('/:id', colaboradorController.getColaborador)
router.delete('/:id', colaboradorController.deleteColaborador)

module.exports = router