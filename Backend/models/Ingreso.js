const mongoose = require('mongoose');

const IngresoSchema = mongoose.Schema({
    idPaciente: {
        type : String, 
        required: true
    },
    paciente: {
        type : String, 
        required: true
    },
    propietario: {
        type : String, 
        required: true
    },
    fecha: {
        type: Date,
        defaultStatus: Date.now()
    },
    comentarios: {
        type: String,
        required: true
    },
    tipo_ingreso: {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Ingreso', IngresoSchema);