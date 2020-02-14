const express = require("express");

const actionModel = require("../data/helpers/actionModel.js");
const projectModel = require("../data/helpers/projectModel.js");

// middleware
const validateProjectID = require("../auth/validateProjectID.js");

const router = express.Router();

// GET requests

// gets actions
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions could not be retrieved.", err })
    );
});

// gets action by id
router.get("/:id", validateProjectID, (req, res) => {
  const id = req.params.id;
  actionModel
    .get(id)
    .then(action => res.status(200).json(action))
    .catch(err =>
      res
        .status(500)
        .json({ error: "That action could not be retrieved.", err })
    );
});

// POST requests

// inserts another action
router.post("/:id", validateProjectID, (req, res) => {
  const id = req.params.id;
  const newAction = { ...req.body, project_id: id };
  actionModel
    .insert(newAction)
    .then(actions => res.status(201).json(newAction))
    .catch(err =>
      res.status(500).json({ error: "This action could not be created.", err })
    );
});

// PUT requests
// edits action
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updateAction = req.body;
  actionModel
    .update(id, updateAction)
    .then(newAction => res.status(200).json(updateAction))
    .catch(err =>
      res.status(500).json({ error: "This action could not be updated.", err })
    );
});

// DELETE requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(action => res.status(200).json({ success: "Request was successful" }))
    .catch(err =>
      res.status(500).json({
        error: "Sorry! We couldn't delete this action at the moment.",
        err
      })
    );
});

module.exports = router;