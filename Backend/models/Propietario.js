const mongoose = require('mongoose');

const PropietarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Propietario', PropietarioSchema);