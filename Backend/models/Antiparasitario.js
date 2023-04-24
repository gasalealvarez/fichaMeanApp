const mongoose = require('mongoose');

const AntiparasitarioSchema = mongoose.Schema({

    antiparasitario: {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Antiparasitario', AntiparasitarioSchema);