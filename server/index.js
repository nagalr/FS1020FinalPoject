'use strict';

const express = require('express');
const path = require('path');
const router = require('./routes/routes');
let defaultErrorHandler = require('./middleware/default-error-handler');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const PORT = 3000;

// Init the app
const app = express();

// Body Parser middleware
app.use(express.json());

// URL handling middleware
app.use(express.urlencoded({ extended: false}));

// Define the router
app.use(router);

// Using Express Default Error Handler
app.use(defaultErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});