const Raza = require('../models/Raza');

exports.crearRaza = async (req, res) => {
    try {
        let raza;

        raza = new Raza(req.body);

        await raza.save();
        res.send(raza);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerRazas = async (req, res) => {
    try {
        const razas = await Raza.find();
        res.json(razas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerRazasEspecie = async (req, res)=> {
    try {
        const razas = await Raza.find({idEspecie:  req.params.id}  );

        if(!razas) {
            res.status(404).json({msg: 'Razas no encontradas'});
        }

        res.json(razas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editarRaza = async (req, res) => {
    try {
        const { raza } = req.body;

        let rza = await Raza.findById(req.params.id);

        if(!rza) {
            res.status(404).json({msg: 'Raza no encontrada'});
        }

        rza.raza = raza;

        rza = await Raza.findByIdAndUpdate({_id: req.params.id}, rza,  {new: true});
        res.json(rza);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.eliminarRaza = async (req, res ) => {
    try {
        let raza = await Raza.findById(req.params.id);

        if (!raza) {
            res.status(404).json({msg: 'Raza no encontrada'});
        }

        await Raza.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Raza eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
