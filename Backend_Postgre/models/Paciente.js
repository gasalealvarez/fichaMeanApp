const { sequelize, pacientes } = require(".");

module.exports = (sequelize, type)=> {
    const Paciente = sequelize.define('paciente', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        idPropietario: type.INTEGER,
        idEspecie: type.INTEGER,
        idRaza: type.INTEGER,
        idSexo: type.INTEGER,
        pelaje: type.STRING,
        fechaNacimiento: type.DATE
    });
    return Paciente;
}

