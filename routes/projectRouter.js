const express = require('express');

const projectModel = require('../data/helpers/projectModel.js');

// middleware
const validateProjectID = require('../auth/validateProjectID.js');

const router = express.Router();

// GET requests
// gets all projects
router.get('/', (req, res) => {
    projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "The projects could not be retrieved.", err }))
})

// get project by id along with it's actions
router.get('/:id', validateProjectID, (req, res) => {
    const id = req.params.id;
    projectModel
    .get(id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ error: "That project could not be retrieved.", err }))
})

// POST requests
// adds a new project
router.post("/", (req, res) => {
    const newProject = req.body;
    projectModel
      .insert(newProject)
      .then(user => res.status(201).json(newProject))
      .catch(err =>
        res.status(500).json({ error: "Cannot create a new project.", err })
      );
  });
  
// PUT requests
// updates a project
router.put("/:id", validateProjectID, (req, res) => {
    const id = req.params.id;
    const updatedProject = req.body;
    projectModel
      .update(id, updatedProject)
      .then(newProject => res.status(200).json(newProject))
      .catch(err =>
        res
          .status(500)
          .json({ error: "Sorry we can't update this project currently", err })
      );
  });

// DELETE requests
// deletes a project
router.delete("/:id", validateProjectID, (req, res) => {
    const id = req.params.id;
    projectModel
      .remove(id)
      .then(project => res.status(200).json({ success: "Request was successful."}))
      .catch(err =>
        res
          .status(500)
          .json({
            error: "Sorry! We couldn't delete this project at the moment.",
            err
          })
      );
  });

module.exports = router;