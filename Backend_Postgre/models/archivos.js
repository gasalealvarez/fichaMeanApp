


module.exports = (sequelize, type)=> {
    const Archivo = sequelize.define('archivo', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        archivoURL: type.STRING,
        public_id: type.STRING
        
    });
    return Archivo;
}