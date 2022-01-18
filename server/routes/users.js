const router = require('express').Router();
let user = require('../models/user.model');



//Below is the default route that is going to return all the available docs in the collection 
router.route('/').get((req,res) => {

    user.find() // find method retrive all docs from mongodb collection
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error: '+err));

});

//Create a new user doc into the collection
router.route('/add').post((req,res) => {

    const username = req.body.username;

    const newUser = new user({username});

    newUser.save() // creates a new document in the existing collection
    .then(() => res.status(201).json('User Added'))
    .catch(err => res.status(401).json('Error adding user : '+ err));

});

module.exports = router;


