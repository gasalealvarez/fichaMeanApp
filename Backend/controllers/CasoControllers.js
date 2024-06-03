const Caso = require('../models/Caso');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


exports.crearCaso = async (req, res) => {
    try {
        // Crear un nuevo registro en la base de datos con la información del archivo subido

        console.log('ingresa')

        const file = req.file;
        const textData = req.body.textData;

        if (!file || !textData) {
           
            return res.status(400).send('Se requiere un archivo y texto');
        }

        // Hacer algo con el archivo y el texto recibidos, como guardarlos en la base de datos o procesarlos de alguna manera


       // const newFile = new File({
       //     filename: file.originalname,
       //     path: file.path,
       //     contentType: file.mimetype
       //  });


        console.log('file' + file.path);
        console.log(textData)
        res.send('Archivo y texto recibidos correctamente');

        //res.json({ message: 'Archivo subido exitosamente', file: newFile });
    } catch (err) {
        console.error('Error al subir el archivo:', err);
        res.status(500).json({ error: 'Error al subir el archivo' });
    }
}

exports.obtenerCaso = async (req, res) => {
    try {
        const caso = await Caso.find({ idCaso: req.params.id });

        if (!caso) {
            res.status(404).json({ msg: 'Caso no encontrado' })
        }
        res, json(caso);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarCaso = async (req, res) => {
    try {

        // falta el codigo...


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.guardarAdjuntos = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
