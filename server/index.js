'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const logger = require('./middleware/logger');
const PORT = 3000;

const app = express();

// app.use(logger);

app.use('/server/db/Users.js', require('../routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});