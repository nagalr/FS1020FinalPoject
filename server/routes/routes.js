'use strict';

const express = require('express');
const router = express.Router();
const users = require('../db/users.json');
const fs = require('fs');

// Route to the root directory
router.get('/', (req, res) => {
    try {
        res.status(200).send('<h1>Welcome and Happy Holidays!</h1>');
    } catch (e) {
        console.error(e.name + ': ' + e.message);
    }
});

// Get all members
router.get('/server/db', async function (req, res, next){
    try {
        await res.status(200).json(users);
    } catch (e) {
        next(e);
    }
});

// GET a single member by req.params /:name
router.get('/server/db/:name', async function (req, res, next) {
    try{
        // some returns true/false if the user exists or not
        const found = users.some(user => user.name === req.params.name);
        if (found) {
            // return the user with the id that match the params /:id
            await res.json(users.filter(user => user.name === req.params.name));
        } else {
            res.status(400).json({ msg: `no user with name: ${req.params.name} found`});
        }
    } catch (e) {
        next(e);
    }
});

// Create a user
router.post('/register', async function(req, res, next) {

    try {
        let newMember = {
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone
        };

        if (!newMember.name || !newMember.email || !newMember.phone) {
            return res.status(400).json({msg: 'Please include your name, email and phone number.'})
        }

        // Creates a one line json from the newMember object
        let jsonUsers = JSON.stringify(users);

        let jsonNewMember = JSON.stringify(newMember);

        let a = jsonUsers.substring(1,jsonUsers.length-1);

        let b = a.concat(',' + jsonNewMember);

        let c = b.concat(']');

        let f = ('[').concat(c);

    // Taken from: https://bit.ly/2McbHT0
    function convertJsonToBlock(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    let obj = JSON.parse(f);
    let str = JSON.stringify(obj, undefined, 4);

    await convertJsonToBlock(str);

    // writes the users.json updated file with fs module
    fs.writeFile('/home/parallels/Desktop/FS1020FinalPoject/server/db/users.json', str, (err) =>{
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.status(200).json({ Registration: 'success!' });

    } catch (e) {
        next(e);
    }
});

// Login route
router.post('/login', (req, res) =>{

    try {
        let newLogin = {
            "name": req.body.name,
            "email": req.body.email
        };

        if (!newLogin.name || !newLogin.email) {
            return res.status(400).json({msg: 'Please include your name and email in order to login.'})
        }

    } catch (e) {
        console.error(e.name + ': ' + e.message);
    }

    try {

        // 'some' returns true/false if the user and the email exists or not
        const found = users.some(user => (user.name === req.body.name &&
                                          user.email === req.body.email));

        if (found) {
            return res.status(200).json({ msg: `Great ${req.body.name}! you logged-in.`});
        } else {
            return res.status(400).json({ msg: `Sorry, no user with your name and email found.`});
        }

    } catch (e) {
        console.error(e.name + ': ' + e.message);
    }

});


module.exports = router;
