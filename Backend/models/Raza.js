const mongoose = require('mongoose');

const RazaSchema = mongoose.Schema({
    idEspecie : {
        type : Number,
        required : true
    },

    raza: {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Raza', RazaSchema);

// mongodb+srv://gaston:<password>@cluster0.udkqztz.mongodb.net/test