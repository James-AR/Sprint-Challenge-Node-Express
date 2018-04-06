const express = require('express');

const db = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
        .get()
        .then(actions => {
            res.json(actions);
        })
        .catch(error => {
            res.status(404).json({
                error: 'Actions could not be found'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
        .get(id)
        .then(project => {
            res.json(project[0]);
        })
        .catch(error => {
            res.status(404).json({
                error: 'Actions could not be found'
            })
        })
})

router.post('/', (req, res) => {
    const object = req.body;
    db
        .insert(object)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json
            ({ error: 'There was an error while saving the action to the database.' })
        })
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    let action;

    db
        .getProjectActions(id)
        .then(response => {
            action = {...response[0] };

        db
        .remove(id)
        .then(response => {
            res.status(500).json(action);
            })
        })
        .catch(error => {
            res.status(500).json({ 
                message: "The action could not be removed" })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.getProjectActions(id).then(updateActions => {
                    res.status(200).json(updateActions[0]);
                })
            } else {
                res.status(400).json({ message: 'The project with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


module.exports = router;