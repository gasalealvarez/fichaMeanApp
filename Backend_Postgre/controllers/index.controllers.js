const path = require('path');
const uniqueFilename = new Date().toISOString()

const db = require('../models');
const Users = db.users;
const Op = db.Sequelize.Op;

const fs = require('fs-extra');

const archivo = require('../models/archivos')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'deie9pvb8', 
  api_key: '526756297468254',
  api_secret: 'zzDyjbvDrjOVCY766ZSeDtwCIyY'
})


exports.findAll =  (req, res)=> {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
  
 Users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}

// const getUserById = async (req, res)=> {
//     const id = req.params.id;
//     const response = await connectdb.query('SELECT * FROM users WHERE id = $1', [id]);
//     res.status(300).json(response.rows);
// }

exports.findOne = (req, res) => {
  const id = req.params.id;

  

  Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.create = (req, res) => {

  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

    const user = {
      name: req.body.name,
      email: req.body.email};

      console.log('user ', user)

    Users.create(user)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}



exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getImage = async (req, res)=> {
    const { filename } = req.params;
    const dirname = path.resolve();
 
    const fullfilepath = path.join(dirname, 'images/' + filename);
    console.log('fullfilepath ', fullfilepath)
    return res.sendFile(fullfilepath);
};

exports.UploadImage = async (req, res)=> {
    console.log(req.file);

    const result = await cloudinary.uploader.upload(req.file.path,{ public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional

    async function(err, image) {
    
    if (err) return res.send('file format is wrong! Only image file supported')
    
    console.log('file uploaded to Cloudinary')
    })

    const archivo = {
      title: result.filename,
      archivoURL: result.url,
      public_id: result.public_id
    }

    console.log(result);
    console.log(archivo)

    await fs.unlink(req.file.path);


    res.json('/image api'); 
}

