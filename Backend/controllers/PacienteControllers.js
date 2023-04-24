const Paciente = require("../models/Paciente");

exports.crearPaciente = async (req, res) => {
        console.log(req.body)
    try {
        let paciente;
 
        paciente = new Paciente(req.body);
 
        await paciente.save();
        res.send(paciente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
 };

 exports.obtenerPacientes = async (req, res) => {
    
    try {
        const pacientes = await Paciente.find({idPropietario:  req.params.id}  );

        if(!pacientes) {
            res.status(404).json({msg: 'Paciente no encontrado'});
        }

        res.json(pacientes);

    

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.actualizarPaciente = async (req, res) => {

    try {
        const { nombre, idPropietario , especie, raza, idSexo, pelaje, fechaNacimiento } = req.body;
        let paciente = await Paciente.findById(req.params.id);

        if(!paciente) {
            res.status(404).json({msg: 'Paciente no encontrado'});
        }

        paciente.nombre = nombre;
        paciente.idPropietario = idPropietario;
        paciente.especie = especie;
        paciente.raza = raza;
        paciente.idSexo = idSexo;
        paciente.pelaje = pelaje;
        paciente.fechaNacimiento = fechaNacimiento;

        paciente = await Paciente.findByIdAndUpdate({_id: req.params.id}, paciente, {new: true});
        res.json(paciente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
};

exports.obtenerPaciente= async (req, res) => {

    try {

        let paciente = await Paciente.findById(req.params.id);

        if(!paciente) {
            res.status(404).json({msg: 'Paciente no encontrado'});
        }

        res.json(paciente);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarPaciente = async (req, res) => {

    try {

        let paciente = await Paciente.findById(req.params.id);

        if(!paciente) {
            res.status(404).json({msg: 'Paciente no encontrado'});
        }

        await Paciente.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Paciente eliminado'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};