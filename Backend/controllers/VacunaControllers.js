const Vacuna = require('../models/Vacuna');

exports.crearVacuna = async (req, res) => {
    try {
        let vacuna;

        vacuna = new Vacuna(req.body);

        await vacuna.save();
        res.send(vacuna);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerVacunas = async (req, res) => {
    try {
        const vacunas = await Vacuna.find();

        if(!vacunas) {
            res.status(404).json({msg: 'Vacunas no encontrados'});
        }

        res.json(vacunas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editarVacuna = async (req, res) => {
    try {
        const { vacuna } = req.body;

        let vac = await Vacuna.findById(req.params.id);

        if(!vac) {
            res.status(404).json({msg: 'Vacuna no encontrada'});
        }

        vac.vacuna = vacuna;

        vac = await Vacuna.findByIdAndUpdate({_id: req.params.id}, vac,  {new: true});
        res.json(vac);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.eliminarVacuna = async (req, res ) => {
    try {
        let vacuna = await Vacuna.findById(req.params.id);

        if (!vacuna) {
            res.status(404).json({msg: 'Vacuna no encontrada'});
        }

        await Vacuna.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Vacuna eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};