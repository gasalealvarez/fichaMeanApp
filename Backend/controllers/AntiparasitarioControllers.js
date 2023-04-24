const Antiparasitario = require('../models/Antiparasitario');

exports.crearAntiparasitario = async (req, res) => {
    try {
        let antiparasitario;

        antiparasitario = new Antiparasitario(req.body);

        await antiparasitario.save();
        res.send(antiparasitario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerAntiparasitarios = async (req, res) => {
    try {
        const antiparasitarios = await Antiparasitario.find();

        if(!antiparasitarios) {
            res.status(404).json({msg: 'Antiparasitarios no encontrados'});
        }

        res.json(antiparasitarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editarAntiparasitario = async (req, res) => {
    try {
        const { antiparasitario } = req.body;

        let atp = await Antiparasitario.findById(req.params.id);

        if(!atp) {
            res.status(404).json({msg: 'Antiparasitario no encontrado'});
        }

        atp.antiparasitario = antiparasitario;

        atp = await Antiparasitario.findByIdAndUpdate({_id: req.params.id}, atp,  {new: true});
        res.json(atp);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.eliminarAntiparasitario = async (req, res ) => {
    try {
        let antiparasitario = await Antiparasitario.findById(req.params.id);

        if (!antiparasitario) {
            res.status(404).json({msg: 'Antiparasitarios no encontrado'});
        }

        await Antiparasitario.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Antiparasitario eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};