const dbConfig = require('../config/db');
const Sequelize= require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,

    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}); 

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.users = require('./user')(sequelize, Sequelize);
db.propietarios = require('./Propietario')(sequelize, Sequelize);
db.pacientes = require('./Paciente') (sequelize, Sequelize);
db.razas = require('./Raza') (sequelize, Sequelize);
// db.vacunas = require('/Vacuna')  (sequelize, Sequelize);

db.sequelize.sync();

module.exports = db;