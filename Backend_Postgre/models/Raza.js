const { sequelize, pacientes } = require(".");

module.exports = (sequelize, type)=> {
    const Raza = sequelize.define('raza', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        raza: type.STRING,
        idEspecie: type.INTEGER
    });
    return Raza;
}
