const express = require('express');
const ActionsDb = require('../helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    ActionsDb.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error retrieving actions data from database." });
        });
});

router.get('/:id', validateId, (req, res) => {
    const id = req.params.id;
    ActionsDb.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error retrieving action data from database." })
        });
});

router.post('/', validateAction, (req, res) => {
    const actionBody = req.body;

    ActionsDb.insert(actionBody)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            err.errno === 19
                ? res.status(500).json({ errorMessage: "Invalid project ID." })
                : res.status(500).json({ errorMessage: "Error posting action to database." });
        });
});

router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id;
    ActionsDb.remove(id)
        .then(count => {
            count < 1
                ? res.status(404).json({ errorMessage: "Action ID not found." })
                : res.status(200).json({ message: "Action deleted." });
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error removing action from database." });
        });
});

router.put('/:id', validateId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    ActionsDb.update(id, changes)
        .then(changedAction => {
            res.status(200).json(changedAction);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error editing action in database." });
        });
});

// middleware

function validateId(req, res, next) {
    const id = req.params.id;
    ActionsDb.get(id)
        .then(action => {
            !action
                ? res.status(404).json({ errorMessage: "ID not found." })
                : next();
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error checking ID in database." })
        })
}

function validateAction(req, res, next) {
    const project_id = req.body.project_id;
    const description = req.body.description;
    const notes = req.body.notes;

    !notes || !description || !project_id
        ? res.status(400).json({ errorMessage: "Please supply a project ID, description, and notes." })
        : next();
}

module.exports = router;