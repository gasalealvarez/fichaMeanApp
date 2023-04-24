const mongoose = require('mongoose');

const PacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    idPropietario: {
        type: String,
        required: true
    },
    idEspecie: {
        type: Number,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    idSexo:  {
        type: Number,
        required: true
    },
    pelaje:  {
        type: String,
        required: true
    },
    fechaNacimiento:  {
        type: Date,
        defaultStatus: Date.now()
    },

});

module.exports = mongoose.model('Paciente', PacienteSchema);