const mongoose = require('mongoose');

const VacunaSchema = mongoose.Schema({

    vacuna: {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('Vacuna', VacunaSchema);