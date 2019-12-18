'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const users = require('../Users');
const PORT = 3000;

const app = express();

app.get('/', (req,res) => {
    res.send(users[0].name);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});