const express = require('express');
const router = express.Router();
const users = require('../server/db/Users');


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

module.exports = router;