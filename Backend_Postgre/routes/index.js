const { Router }= require('express');
const users = require("../controllers/index.controllers");
const propietarios = require('../controllers/PropietarioControllers');
const pacientes = require('../controllers/PacienteControllers');
const razas = require('../controllers/RazaControllers');


const router = Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file,cb)=> {
    cb(null, file.originalname)
  }
})

const imageUpload = multer({
  storage: storage,
  dest: 'images',
})



// const { getUsers , createUser, getUserById, deleteUser, updateUser,
        // getImage, UploadImage } = require('../controllers/index.controllers');

// routes
router.get('/users',  users.findAll);
router.post('/users',  users.create);
router.get('/users/:id', users.findOne);
// router.delete('/users/:id', deleteUser)
router.put('/users/:id', users.update)
router.post('/image', imageUpload.single('image'),users.UploadImage);
router.get('/image/:filename', users.getImage);


// Routes for Propietario
router.post('/propietario', propietarios.create);
router.put('/propietario/:id', propietarios.update);
router.delete('/propietario/:id', propietarios.delete);
router.get('/propietario/:id', propietarios.findOne);

// Routes for Paciente
router.post('/paciente', pacientes.create);
router.get('/paciente/:id', pacientes.findOne);
router.get('/paciente', pacientes.findAll);
router.put('/paciente/:id', pacientes.update);
router.delete('/paciente/:id', pacientes.delete);

// Routes for Raza
router.post('/raza', razas.create);
router.get('/raza', razas.findAll);
router.get('/raza/:id', razas.findOne);
router.put('/raza/:id', razas.update);

module.exports = router;
