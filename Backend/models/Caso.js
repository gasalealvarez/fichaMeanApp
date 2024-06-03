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
    },
    files: [{
        filename: String,
        path: String,
        size: Number,
        createdAt: { type: Date, default: Date.now }
      }]
})

module.exports = mongoose.model('Caso', CasoSchema);

const fileSchema = new mongoose.Schema({
    
  });