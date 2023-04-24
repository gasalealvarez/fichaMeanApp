const mongoose  = require("mongoose");

const CasoSchema = mongoose.Schema({
    idCaso: {
        type : String
    },
    idPaciente : {
       type: String,
       required : true
    } ,
    antecedentes: {
        type: String
    },
    sintomas: {
        type: String
    },
    tratamiento: {
        type: String
    }
})

module.exports = mongoose.model('Caso', CasoSchema);