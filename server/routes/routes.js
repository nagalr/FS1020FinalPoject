'use strict';

const express = require('express');
const router = express.Router();
const users = require('../db/Users');

router.get('/', (req, res, next) => {
    res.send('Check the root directory')
});

// Get all members
router.get('/server/db', (req, res) =>{
    res.json(users);
});

// GET a single member by req.params /:id
router.get('/server/db/:id', (req, res) => {
    // some returns true/false if the user exists or not
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        // return the user with the id that match the params /:id
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `no user with id: ${req.params.id} found`});
    }

});

// Create User
router.post('/register', (req, res) => {
   const newMemner = {
       name: req.body.name,
       email: req.body.email,
       phone: req.body.phone
   };

   if (!newMemner.name) {
       return res.status(400).json({ msg: 'Please include your name.'})
   }

   if (!newMemner.email) {
       return res.status(400).json({ msg: 'Please include your email.'})
   }

   if (!newMemner.phone) {
       return res.status(400).json({ msg: 'Please include your phone.'})
   }

   // All the fields provided
   users.push(newMemner);
   res.json(users);
});

module.exports = router;