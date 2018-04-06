const express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
        .get()
        .then(projects => {
            res.json(projects);
        })
        .catch(error => {
            res.status(404).json({
                error: 'Projects could not be found'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
        .getProjectActions(id)
        .then(project => {
            res.json(project[0]);
        })
        .catch(error => {
            res.status(404).json({
                error: 'Projects could not be found'
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
            ({ error: 'There was an error while saving the object to the database.' })
        })
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    let project;

    db
        .getProjectActions(id)
        .then(response => {
            project = {...response[0] };

        db
        .remove(id)
        .then(response => {
            res.status(500).json(project);
            })
        })
        .catch(error => {
            res.status(500).json({ 
                message: "The project could not be removed" })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.getProjectActions(id).then(updateProjects => {
                    res.status(200).json(updateProjects[0]);
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