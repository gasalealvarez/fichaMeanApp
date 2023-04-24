const Plan = require('../models/PlanSanitario');

exports.crearPlan = async(req, res) => {
    try {
        let plan;

        plan = new Plan(req.body);

        await plan.save();
        res.send(plan);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPlan = async (req, res)=> {
 try {
     const plan = await Plan.find({idPaciente: req.params.id});

     if(!plan){
        res.status(404).json({msg: 'Paciente no encontrado'});
     }

     res.json(plan);

 } catch (error) {
     console.log(error);
     res.status(500).send('Hubo un error');
 }
}

exports.actualizarPlan = async ( req, res ) => {
    try {
        const { fecha, vacuna, antiparasitario, fechaProxima, comentarios ,
                recordatorio } = req.body;
        let plan = await Plan.findById(req.params.id);

        if (!plan) {
            res.status(404).json({msg: 'Paciente no encontrado'});
        }

        // falta el codigo aca
        plan.fecha = fecha;
        plan.vacuna = vacuna;
        plan.antiparasitario = antiparasitario;
        plan.fechaProxima = fechaProxima;
        plan.comentarios = comentarios;
        plan.recordatorio = recordatorio;

        plan = await Plan.findByIdAndUpdate({_id: req.params.id}, plan, {new:true})
        res.json(plan);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.eliminarPlan = async (req, res )=> {
    try {
        let plan = await Plan.findById(req.params.id);

        if(!plan) {
            res.status(404).json({msg: 'Plan no encontrado'});
        }

        await Plan.findByIdAndRemove({_id: req.params.id});
        res.json({msg:'Entrada Plan Eliminado'})

    }  catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}