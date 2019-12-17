'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const PORT = 3001;

// The Database
const database = {
    name: [
        {
            id: "123",
            name: "john",
            email: "john@gmail.com"
        }
    ]
};

// Set up the express app
const app = express();

// Express JSON parsing middleware setup
app.use(bodyParser.json());

/* The api routs that we will use here:
/ (root) GET res = 'this is working!'
/signin --> POST = (res) success/fail
/register --> POST = (res) user
/profile/:userID --> GET = (res) user
 */

app.get('/', (req,res) => {
    res.send('This is the homepage');
});



// Define default middleware error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});

app.listen(3001, () => {
    console.log(`Server is running on port ${PORT}`)
});