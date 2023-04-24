const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const URI = 'mongodb+srv://gaston:1234@cluster0.qb9lw.mongodb.net/ficha-crud';
console.log(process.env.DB_MONGO)

const conectarDB = async () => {
    try {
        await mongoose.connect(URI)
           
        console.log('BD conectada !!')

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = conectarDB;
