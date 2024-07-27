const express = require('express');
const router = express.Router();
const multer = require('multer');



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
router.get('/ingreso/:id', ingresoControlador.obtenerIngresosPorPaciente);
router.post('/ingreso', ingresoControlador.crearIngreso);
router.put('/ingreso/:id', ingresoControlador.actualizarIngreso);
router.delete('/ingreso/:id', ingresoControlador.eliminarIngreso);

const razaControlador = require('../Controladores/razaControlador');
router.get('/raza', razaControlador.obtenerRazas);
router.get('/raza/:id', razaControlador.obtenerRazasEspecie);
router.post('/raza', razaControlador.crearRaza);
router.put('/raza', razaControlador.actualizarRaza);
router.delete('/raza/:id', razaControlador.eliminarRaza);

const antiparasitarioControlador = require('../Controladores/antiparasitarioControlador');
router.get('/antiparasitario', antiparasitarioControlador.obtenerAntiparasitarios);
router.post('/antiparasitario', antiparasitarioControlador.crearAntiparasitario);
router.put('/antiparasitario/:id', antiparasitarioControlador.editarAntiparasitario);
router.delete('/antiparasitario/:id', antiparasitarioControlador.eliminarAntiparasitario);

const vacunaControlador = require('../Controladores/vacunaControlador');
router.get('/vacuna', vacunaControlador.obtenerVacunas);
router.post('/vacuna', vacunaControlador.crearVacuna);
router.put('/vacuna/:id', vacunaControlador.editarVacuna);
router.delete('/vacuna/:id', vacunaControlador.eliminarVacuna);

const planControlador = require('../Controladores/planControlador');
router.get('/plan/:id', planControlador.obtenerPlan);
router.get('/plan', planControlador.obtenerTareas);
router.post('/plan', planControlador.crearPlan);
router.put('/plan/:id', planControlador.editarPlan);
router.delete('/plan/:id', planControlador.eliminarPlan);

const casoControlador = require('../Controladores/casoControlador');
router.get('/caso/:id', casoControlador.obtenerCaso);
router.post('/caso', casoControlador.crearCaso);
router.put('/caso/:id', casoControlador.actualizarCaso);
router.delete('/caso/:id', casoControlador.eliminarCaso);



// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directorio donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Nombre original del archivo
    }
});

const upload = multer({ storage: storage });

const archivoControlador = require('../Controladores/archivosControlador');
router.post('/archivo', upload.single('file'), archivoControlador.crearArchivo);
router.get('/archivo/:id', archivoControlador.obtenerArchivos);
router.delete('/archivo/:id', archivoControlador.eliminarArchivo);



module.exports = router;