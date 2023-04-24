const { pacientes } = require('../models');
const db = require('../models');
const Pacientes = db.pacientes;


exports.create = (req, res) => {
    const paciente = {
        idPropietario: req.body.idPropietario,
        nombre : req.body.nombre,
        especie: req.body.idEspecie,
        raza: req.body.idRaza,
        idSexo: req.body.idSexo,
        pelaje: req.body.pelaje,
        fechaNacimiento : req.body.fechaNacimiento
    }

    Pacientes.create(paciente)
        .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Paciente ."
            });
          });
}

exports.findOne = (req, res)=> {
    const id = req.params.id;


    Pacientes.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
            res.status(404).send({
                message: `Cannot find Paciente with id=${id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Paciente with id=" + id
            });
        });
}

exports.findAll =  (req, res)=> { 
    Pacientes.findAll () 
       c
}

exports.update = (req, res) => {
    const id = req.params.id;

    Pacientes.update(req.body, {
      where : { id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message:"Paciente was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Paciente with id=${id}. Maybe Propietario was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Paciente with id=" + id
      });
    });
  };

  exports.delete = (req, res)=> {
    const id = req.params.id;

    Pacientes.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Paciente was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Paciente with id=${id}. Maybe Propietario was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Paciente with id=" + id
        });
      });
  };