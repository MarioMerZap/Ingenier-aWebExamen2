const express = require('express')
const router = express.Router()

const tareaController = require('../controllers/TareaController')

router.get('/', tareaController.getAllTareas)
router.post('/', tareaController.createTarea)

router.get('/habilidad', tareaController.getTareasPorHabilidad); // Tareas que requieren una habilidad
router.get('/colaborador', tareaController.getTareasPorColaborador); // Tareas asignadas a un colaborador
router.get('/completas', tareaController.getTareasCompletamenteAsignadas); // Tareas completamente asignadas
router.get('/colaboradores', tareaController.getColaboradoresDeUsuario); // Buscar colaboradores de un usuario


router.post('/:id/asignar/:colaboradorId', tareaController.asignarColaboradorATarea); // Asignar colaborador a tarea
router.get('/:id/candidatos', tareaController.buscarCandidatosParaTarea); // Buscar candidatos para una tarea

router.get('/:id', tareaController.getTarea)
router.put('/:id', tareaController.updateTarea)
router.delete('/:id', tareaController.deleteTarea)
module.exports = router
