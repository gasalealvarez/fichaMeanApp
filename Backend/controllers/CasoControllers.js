const Caso = require('../models/Caso');

exports.crearCaso = async(req, res) =>  {
    try {
        let caso;

        caso: new Caso(req.body);

        await caso.save();
        res.send(caso);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCaso = async (req, res) => {
    try {
        const caso = await Caso.find({idCaso: req.params.id});

        if(!caso) {
            res.status(404).json({msg: 'Caso no encontrado'})
        }
        res,json(caso);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarCaso = async (req, res)=> {
    try {

        // falta el codigo...
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}
