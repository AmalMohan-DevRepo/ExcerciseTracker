const router = require('express').Router();
let exercise = require('../models/exercise.model');

//Below is the default route that is going to return all the available docs in the collection 
router.route('/').get((req,res) => {

    exercise.find() // find method retrive all docs from mongodb collection
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json('Error: '+err));

});

//Create a new user doc into the collection
router.route('/add').post((req,res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    const newExercise = new exercise({username,description,duration,date});

    newExercise.save() // creates a new document in the existing collection
    .then(() => res.status(201).json('Exercise Added'))
    .catch(err => res.status(401).json('Error adding exercise : '+ err));

});

//filter by id
router.route('/:id').get((req,res) => {
    exercise.findById(req.params.id) //find doc from collection using id
    .then(exer => res.json(exer))
    .catch(err => res.status(400).json(err.message));
});

//delete by id
router.route('/:id').delete((req,res) => {
    exercise.findByIdAndDelete(req.params.id) //delete doc
    .then(() => res.status(200).json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update using id
router.route('/update/:id').post((req,res) => {
    exercise.findById(req.params.id) // find the doc and reassign values
    .then(exer => {
        exer.username = req.body.username;
        exer.description = req.body.description;
        exer.duration = Number(req.body.duration);
        exer.date = Date.parse(req.body.date);

        exer.save()
        .then(() => res.status(200).json('Exercise Update'))
        .catch(err => res.status(400).json('Error updating record: '+ err))
    })
    .catch(err => res.status(400).json('Error finding record to update: '+ err))

});

module.exports = router;


