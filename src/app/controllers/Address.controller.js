const { request } = require("http");
const db = require("../models");
const Address = db.address;
const Op = db.Sequelize.Op;

// Create and Save a new Address
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Address
  const address = {
    addressId: req.body.addressId, 
    address: req.body.address,
    postal_Code: req.body.postal_Code,
    date_Of_Update: req.body.date_Of_Update,
  };

  // Save Tutorial in the database
  Address.create(address)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address."
      });
    });
};

// Retrieve all Address from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Address.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving addresses."
      });
    });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Address.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Address with id=" + id
      });
    });
};

// Update a Address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Address.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Address with id=" + id
      });
    });
};

// Delete a Address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Address with id=" + id
      });
    });
};

// Delete all Address from the database.
exports.deleteAll = (req, res) => {
  Address.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Address were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all addresses."
      });
    });
};

// find all published Address
exports.findAllPublished = (req, res) => {
  Address.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving addresses."
      });
    });
};