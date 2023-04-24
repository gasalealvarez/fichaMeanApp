const { sequelize } = require(".");

module.exports = (sequelize, type)=> {
    const Propietario = sequelize.define('propietario', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        direccion: type.STRING,
        telefono: type.STRING,
        email: type.STRING
    });
    return Propietario;
}
