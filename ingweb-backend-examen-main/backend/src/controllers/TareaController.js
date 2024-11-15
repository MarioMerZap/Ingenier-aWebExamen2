const Event = require('../models/TareaModel')

// basic CRUD operations for events
const getAllTareas = async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events).status(200)
    } catch (error) {
        console.log('Error obteniendo eventos:', error);
        res.status(500).json({ message: 'Error obteniendo eventos' });
    }
}

const getTarea = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)
        if(!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(event).status(200)
    } catch (error) {
        console.log('Error getting event:', error);
        res.status(500).json({ message: 'Error getting event' });
    }
}

const createTarea = async (req, res) => {
    try {
        const newEvent = new Event(req.body)

        await newEvent.save()

        res.json(newEvent).status(201)
    } catch (error) {
        console.log('Error creando eventos:', error);
        res.status(500).json({ message: 'Error creando eventos' });
    }
}

const updateTarea = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });

        if(!updatedEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.json(updatedEvent).status(200)
    } catch (error) {
        console.log('Error actualizando eventos:', error);
        res.status(500).json({ message: 'Error actualizando eventos' });
    }
}

const deleteTarea = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id)
        if(!deletedEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(deletedEvent).status(200)
    } catch (error) {
        console.log('Error borrando eventos:', error);
        res.status(500).json({ message: 'Error borrando eventos' });
    }
}

const getTareasPorHabilidad = async (req, res) => {
    try {
        const { habilidad } = req.query;

        if (!habilidad) {
            return res.status(400).json({ message: 'La habilidad es requerida' });
        }

        const tareas = await Event.find({ habilidades: habilidad });

        res.json(tareas).status(200);
    } catch (error) {
        console.log('Error obteniendo tareas por habilidad:', error);
        res.status(500).json({ message: 'Error obteniendo tareas por habilidad' });
    }
};

const getTareasPorColaborador = async (req, res) => {
    try {
        const { responsable } = req.query;

        if (!responsable) {
            return res.status(400).json({ message: 'El email del colaborador es requerido' });
        }

        const tareas = await Event.find({ 'asignados': responsable });

        res.json(tareas).status(200);
    } catch (error) {
        console.log('Error obteniendo tareas por colaborador:', error);
        res.status(500).json({ message: 'Error obteniendo tareas por colaborador' });
    }
};

const asignarColaboradorATarea = async (req, res) => {
    try {
        const { tareaId, colaboradorId } = req.params;

        const tarea = await Event.findById(tareaId);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        const colaborador = await User.findById(colaboradorId);
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        const tieneHabilidad = tarea.habilidades.some(habilidad =>
            colaborador.contactos.includes(habilidad)
        );

        if (!tieneHabilidad) {
            return res.status(400).json({ message: 'El colaborador no tiene las habilidades requeridas para esta tarea' });
        }

        tarea.asignados = tarea.asignados || [];
        tarea.asignados.push(colaborador.email);

        await tarea.save();

        res.json(tarea).status(200);
    } catch (error) {
        console.log('Error asignando colaborador a tarea:', error);
        res.status(500).json({ message: 'Error asignando colaborador a tarea' });
    }
};

const buscarCandidatosParaTarea = async (req, res) => {
    try {
        const { tareaId } = req.params;

        const tarea = await Event.findById(tareaId);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        const candidatos = await User.find({
            habilidades: { $in: tarea.habilidades }
        }).select('email -_id');

        res.json(candidatos).status(200);
    } catch (error) {
        console.log('Error buscando candidatos para tarea:', error);
        res.status(500).json({ message: 'Error buscando candidatos para tarea' });
    }
};

const getTareasCompletamenteAsignadas = async (req, res) => {
    try {
        const tareas = await Event.find({
            $expr: { $eq: [{ $size: "$asignados" }, "$segmentos"] }
        });

        res.json(tareas).status(200);
    } catch (error) {
        console.log('Error obteniendo tareas completamente asignadas:', error);
        res.status(500).json({ message: 'Error obteniendo tareas completamente asignadas' });
    }
};

const getColaboradoresDeUsuario = async (req, res) => {
    try {
        const { responsable } = req.query;

        if (!responsable) {
            return res.status(400).json({ message: 'El email del responsable es requerido' });
        }

        const tareas = await Event.find({ responsable: responsable });

        const colaboradores = new Set();
        tareas.forEach(tarea => {
            tarea.asignados.forEach(email => colaboradores.add(email));
        });

        res.json([...colaboradores]).status(200);
    } catch (error) {
        console.log('Error obteniendo colaboradores de usuario:', error);
        res.status(500).json({ message: 'Error obteniendo colaboradores de usuario' });
    }
};



module.exports = {
    getAllTareas,
    getTarea,
    createTarea,
    updateTarea,
    deleteTarea,
    getTareasPorHabilidad,
    getTareasPorColaborador,
    asignarColaboradorATarea,
    buscarCandidatosParaTarea,
    getTareasCompletamenteAsignadas,
    getColaboradoresDeUsuario,
};
