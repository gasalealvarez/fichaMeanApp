const Propietario = require("../models/Propietario");

exports.crearPropietario = async (req, res) => {

   try {
       let propietario;

       propietario = new Propietario(req.body);

       await propietario.save();
       res.send(propietario);
       
   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }
};

exports.obtenerPropietarios = async (req, res) => {
    
    try {
        const propietarios = await Propietario.find();
        res.json(propietarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPropietario = async (req, res) => {

    try {
        const { nombre, direccion, telefono, email } = req.body;
        let propietario = await Propietario.findById(req.params.id);

        if(!propietario) {
            res.status(404).json({msg: 'Propietario no encontrado'});
        }

        propietario.nombre = nombre;
        propietario.direccion = direccion;
        propietario.telefono = telefono;
        propietario.email = email;

        propietario = await Propietario.findByIdAndUpdate({_id: req.params.id}, propietario, {new: true});
        res.json(propietario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }


}

exports.obtenerPropietario = async (req, res) => {

    try {

        let propietario = await Propietario.findById(req.params.id);

        if(!propietario) {
            res.status(404).json({msg: 'Propietario no encontrado'});
        }

        res.json(propietario);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPropietario = async (req, res) => {

    try {

        let propietario = await Propietario.findById(req.params.id);

        if(!propietario) {
            res.status(404).json({msg: 'Propietario no encontrado'});
        }

        await Propietario.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Propietario eliminado'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
