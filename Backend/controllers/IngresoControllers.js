const Ingreso = require('../models/Ingreso');

exports.crearIngreso = async (req, res) => {
    try {
        let ingreso;

        ingreso = new Ingreso(req.body);

        await ingreso.save();
        res.send(ingreso);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerIngresosPorPaciente= async (req, res) => {
    try {
        const ingresos = await Ingreso.find({idPaciente: req.params.id});

        if (!ingresos) {
            res.status(404).json({msg: 'Ingresos no encontrados'})
        }

        res.json(ingresos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerIngresos= async (req, res) => {
    try {
        const ingresos = await Ingreso.find();

        if (!ingresos) {
            res.status(404).json({msg: 'Ingresos no encontrados'})
        }

        res.json(ingresos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarIngreso = async (req, res )=> {
    try {

        const { idPaciente, fecha, comentarios , tipo_ingreso} = req.body;

  
        let ingreso = await Ingreso.findById(req.params.id);

        if(!ingreso) {
            res.status(404).json({msg: 'Ingreso no encontrado'});
        }

    
        ingreso.fecha = fecha;
        ingreso.comentarios = comentarios;
        ingreso.tipo_ingreso = tipo_ingreso;

        ingreso = await Ingreso.findByIdAndUpdate({_id: req.params.id}, ingreso, {new: true});
        res.json(ingreso);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.eliminarIngreso= async (req, res)=> {
    try {
       let ingreso = await Ingreso.findById(req.params.id);
       
       if(!ingreso) {
           res.status(404).json({msg: 'Ingreso no encontrado'});
       }

       await Ingreso.findOneAndRemove({_id: req.params.id});
       res.json({msg: 'Ingreso Eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}