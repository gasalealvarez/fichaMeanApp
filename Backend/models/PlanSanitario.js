const mongoose = require('mongoose');

const PlanSanitarioSchema = mongoose.Schema({
    idPaciente: {
        type: String,
        required : true
    },
    vacuna: {
        type : String, 
    },
    antiparasitario: {
        type : String, 
    },

    fecha: {
        type: Date,
        defaultStatus: Date.now()
    },

    fechaProxima: {
        type: Date,
        defaultStatus: Date.now()
    },

    recordatorio: {
        type: Boolean,
        defaultStatus: false
    },

    comentarios: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('PlanSanitario', PlanSanitarioSchema);