const mongoose = require('mongoose');

const TareasSchema = new mongoose.Schema(
    {
        responsable: {
            type: String,
            required: true,
            match: /.+\@.+\..+/ // Validación simple para correos electrónicos
        },

        descripcion: {
            type: String,
            required: true,
            maxlength: 50 // Máximo 50 caracteres
        },

        habilidades: {
            type: [String] // Arreglo de habilidades como términos
            
        },

        segmentos: {
            type: Number, // Duración en segmentos de 1 hora
            required: true,
            min: 1 // Asegurarse que sea al menos 1 segmento
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tareas', TareasSchema);