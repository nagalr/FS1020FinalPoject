'use strict';

const express = require('express');
const path = require('path');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const logger = require('./middleware/logger');
const PORT = 3000;

const app = express();

// Body Parser middleware
app.use(express.json());

// URL handling middleware
app.use(express.urlencoded({ extended: false}));

app.use('/', router);

// users api routes
app.use('/server/db/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});