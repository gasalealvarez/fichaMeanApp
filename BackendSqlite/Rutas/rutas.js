const express = require('express');
const router = express.Router();

const propietarioControlador = require('../Controladores/propietarioControlador');

router.get('/propietario', propietarioControlador.obtenerPropietarios);
router.get('/propietario/:id', propietarioControlador.obtenerPropietario);
router.post('/propietario', propietarioControlador.crearPropietario);
router.put('/propietario/:id', propietarioControlador.actualizarPropietario);
router.delete('/propietario/:id', propietarioControlador.eliminarPropietario);


const pacienteControlador = require('../Controladores/pacienteControlador');
router.get('/paciente', pacienteControlador.obtenerPacientes);
router.get('/paciente/:id', pacienteControlador.obtenerPaciente);
router.post('/paciente', pacienteControlador.crearPaciente);
router.put('/paciente/:id', pacienteControlador.actualizarPaciente);

const ingresoControlador = require('../Controladores/ingresoControlador');
router.get('/ingreso', ingresoControlador.obtenerIngresos);
router.get('/ingreso/:id' , ingresoControlador.obtenerIngresosPorPaciente);
router.post('/ingreso', ingresoControlador.crearIngreso);
router.put('/ingreso/:id', ingresoControlador.actualizarIngreso);
router.delete('/ingresos/:id', ingresoControlador.eliminarIngreso);

module.exports = router;