const express = require('express');
const router = express.Router();

const multer = require('multer');

const propietarioController = require('../controllers/PropietarioController');
const pacienteController = require('../controllers/PacienteControllers');
const ingresoController = require('../controllers/IngresoControllers');
const antiparasitarioController = require('../controllers/AntiparasitarioControllers');
const vacunaController = require('../controllers/VacunaControllers');
const razaController= require('../controllers/RazaControllers');
const planController = require('../controllers/PlanControllers');
const casoController= require('../controllers/CasoControllers');

//  rutas de propietarios

router.post('/propietario', propietarioController.crearPropietario);
router.get('/propietario', propietarioController.obtenerPropietarios);
router.put('/propietario/:id', propietarioController.actualizarPropietario);
router.get('/propietario/:id', propietarioController.obtenerPropietario);
router.delete('/propietario/:id', propietarioController.eliminarPropietario);

// rutas de pacientes

router.post('/paciente', pacienteController.crearPaciente);
router.get('/paciente/:id', pacienteController.obtenerPacientes);
router.put('/paciente/:id', pacienteController.actualizarPaciente);
router.delete('/paciente/:id', pacienteController.eliminarPaciente);

// rutas para ingresos

router.post('/ingreso', ingresoController.crearIngreso);
router.get('/ingreso/:id', ingresoController.obtenerIngresosPorPaciente);
router.get('/ingreso', ingresoController.obtenerIngresos);
router.put('/ingreso/:id', ingresoController.actualizarIngreso);
router.delete('/ingreso/:id', ingresoController.eliminarIngreso);

// rutas para Antiparasitarios

router.post('/antiparasitario', antiparasitarioController.crearAntiparasitario);
router.get('/antiparasitario', antiparasitarioController.obtenerAntiparasitarios);
router.put('/antiparasitario/:id', antiparasitarioController.editarAntiparasitario);
router.delete('/antiparasitario/:id', antiparasitarioController.eliminarAntiparasitario);

// rutas para Vacunas

router.post('/vacuna', vacunaController.crearVacuna);
router.get('/vacuna', vacunaController.obtenerVacunas);
router.put('/vacuna/:id', vacunaController.editarVacuna);
router.delete('/vacuna/:id', vacunaController.eliminarVacuna);


// rutas para Razas
router.post('/raza', razaController.crearRaza);
router.get('/raza', razaController.obtenerRazas);
router.get('/raza/:id', razaController.obtenerRazasEspecie);
router.put('/raza/:id', razaController.editarRaza);
router.delete('/raza/:id', razaController.eliminarRaza);

// rutas para Plan Sanitario
router.post('/plan', planController.crearPlan);
router.get('/plan/:id', planController.obtenerPlan);
router.put('/plan/:id', planController.actualizarPlan);
router.delete('/plan/:id', planController.eliminarPlan);


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
  




// rutas para Caso

router.post('/caso', upload.single('file'), casoController.crearCaso);
router.get('/caso/:id', '/upload', upload.single('file'), casoController.obtenerCaso);



module.exports = router;