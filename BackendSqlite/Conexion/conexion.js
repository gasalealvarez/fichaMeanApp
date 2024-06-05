const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./ficha.sqlite", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);

    db.run("CREATE TABLE  IF NOT EXISTS  propietarios (ID INTEGER PRIMARY KEY, nombre, direccion, telefono,  email)");
    db.run("CREATE TABLE  IF NOT EXISTS  pacientes (ID INTEGER PRIMARY KEY, nombre, idPropietario INTEGER, idEspecie INTEGER,  raza, idSexo INTEGER, pelaje, fechaNacimiento)");
    db.run("CREATE TABLE  IF NOT EXISTS  ingresos (ID INTEGER PRIMARY KEY, idPaciente INTEGER, paciente, propietario, fecha, comentarios, tipo_ingreso INTEGER)");
    db.run("CREATE TABLE  IF NOT EXISTS  razas (ID INTEGER PRIMARY KEY, idEspecie INTEGER, raza)");
    db.run("CREATE TABLE  IF NOT EXISTS  antiparasitarios (ID INTEGER PRIMARY KEY, antiparasitario )");
    db.run("CREATE TABLE  IF NOT EXISTS  vacunas (ID INTEGER PRIMARY KEY, vacuna )");
});

module.exports = db;