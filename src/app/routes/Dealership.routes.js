module.exports = app => {
  const dealerships = require("../controllers/dealership.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", dealerships.create);

  // Retrieve all Tutorials
  router.get("/", dealerships.findAll);

  // Retrieve all published Tutorials
  router.get("/published", dealerships.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", dealerships.findOne);

  // Update a Tutorial with id
  router.put("/:id", dealerships.update);

  // Delete a Tutorial with id
  router.delete("/:id", dealerships.delete);

  // Delete all Tutorials
  router.delete("/", dealerships.deleteAll);

  app.use('/api/dealerships', router);
};