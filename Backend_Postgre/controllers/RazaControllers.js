const { razas }= require('../models');
const db = require('../models');
const Razas = db.razas;

exports.create = (req, res) => {
    const raza = {
        raza: req.body.raza,
        idEspecie: req.body.idEspecie
    }

    Razas.create(raza)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Raza ."
            });
        });
}

exports.findAll = (req, res)=> {
    Razas.findAll ()
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

    Razas.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
        res.status(404).send({
            message: `Cannot find Raza with id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving Raza with id=" + id
        });
    });
}

exports.update = (req, res)=> {
    const id = req.params.id;

    Razas.update(req.body, {
        where : { id: id}
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message:"Raza was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Raza with id=${id}. Maybe Propietario was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Raza with id=" + id
        });
      });
}

exports.delete = (req, res)=> {
    Razas.destroy({
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
}
