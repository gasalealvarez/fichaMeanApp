const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./ficha.sqlite", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);

    db.run("CREATE TABLE  IF NOT EXISTS  propietarios (ID INTEGER PRIMARY KEY, nombre, direccion, telefono,  email)");
    db.run("CREATE TABLE  IF NOT EXISTS  pacientes (ID INTEGER PRIMARY KEY, nombre, idPropietario INTEGER, idEspecie INTEGER,  raza, idSexo INTEGER, pelaje, fechaNacimiento)");
    db.run("CREATE TABLE  IF NOT EXISTS  ingresos (ID INTEGER PRIMARY KEY, idPaciente INTEGER, paciente, propietario, fecha, comentarios, tipo_ingreso INTEGER)");
    
});

module.exports = db;