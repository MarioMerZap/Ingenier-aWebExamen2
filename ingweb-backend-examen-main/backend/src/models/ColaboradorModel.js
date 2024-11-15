const mongoose = require('mongoose');
const ColaboradoresSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            match: /.+\@.+\..+/ // Validación simple para correos electrónicos
        },
        nombre: {
            type: String,
            require: true
        },
        habilidades: {
            type: [String] // Arreglo de habilidades como términos
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', ColaboradoresSchema);