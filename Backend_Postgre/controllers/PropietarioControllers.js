const { propietarios } = require('../models');
const db = require('../models');
const Propietarios = db.propietarios;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request
    // if (!req.body.title) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
      const propietario = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email};
  
        console.log('propietario ', propietario)
  
      Propietarios.create(propietario)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Propietario ."
        });
      });
  }

  exports.update = (req, res) => {
    const id = req.params.id;

    Propietarios.update(req.body, {
      where : { id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message:"Propietario was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Propietario with id=${id}. Maybe Propietario was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Propietarios with id=" + id
      });
    });
  };

  exports.delete = (req, res)=> {
    const id = req.params.id;

    Propietarios.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Propietario was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Propietario with id=${id}. Maybe Propietario was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Propietario with id=" + id
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    
    Propietarios.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Propietario with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Propietario with id=" + id
        });
      });
  };