const User = require('../models/ColaboradorModel')

// basic CRUD operations for users
const getAllColaboradores = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users).status(200)
    } catch (error) {
        console.log('Error obteniendo colaboradores:', error);
        res.status(500).json({ message: 'Error obteniendo colaboradores' });
    }
}

const getColaborador = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({ message: 'Error colaborador no encontrado' });
        }
        res.json(user).status(200)
    } catch (error) {
        console.log('Error getting user:', error);
        res.status(500).json({ message: 'Error getting user' });
    }
}

const createColaborador = async (req, res) => {
    try {
        const { email, nombre, habilidades } = req.body

        if(!email || !nombre || !habilidades) {
            return res.status(400).json({ message: 'Faltan campos requerido' });
        }

        const newUser = new User({
            email,
            nombre,
            habilidades
        })

        await newUser.save()

        res.json(newUser).status(201)
    } catch (error) {
        console.log('Error creando colaboradores:', error);
        res.status(500).json({ message: 'Error creando colaboradores' });
    }
}

const deleteColaborador = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser) {
            return res.status(404).json({ message: 'Error colaborador no encontrado' });
        }
        res.json(deletedUser).status(200)
    } catch (error) {
        console.log('Error borrando colaboradores:', error);
        res.status(500).json({ message: 'Error borrando colaboradores' });
    }
}

const getColaboradorHabilidades = async (req, res) => {
    try {
        // filter by partial email
        filter = {}
        if(req.query.email) {
            filter.email = req.query.email
        }

        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        const habilidades = user.habilidades.filter(habilidad => habilidad.match(filter.email))
        res.json(habilidades).status(200)
    } catch (error) {
        console.log('Error obteniendo habilidades del colaborador:', error);
        res.status(500).json({ message: 'Error obteniendo habilidades del colaborador' });
    }
}

const addHabilidad = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        const { habilidades } = req.body

        if(!habilidades) {
            return res.status(400).json({ message: 'Faltan campos requerido' });
        }

        user.habilidades.push(habilidades)
        await user.save()

        res.json(user).status(200)
    } catch (error) {
        console.log('Error añadiendo habilidad:', error);
        res.status(500).json({ message: 'Error añadiendo habilidad' });
    }
}

const deleteHabilidad = async (req, res) => {

    try {
        const { id, habilidad } = req.params
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        const contactIndex = user.habilidades.indexOf(habilidad)
        if(contactIndex === -1) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        user.habilidades.splice(contactIndex, 1)
        await user.save()

        res.json(user).status(200)
    } catch (error) {
        console.log('Error borrando habilidad:', error);
        res.status(500).json({ message: 'Error borrando habilidad' });
    }
}

module.exports = {
    getAllColaboradores,
    getColaborador,
    createColaborador,
    deleteColaborador,
    getColaboradorHabilidades,
    addHabilidad,
    deleteHabilidad,
}