'use strict';
const err = require("express");


//Default error handling middleware.
module.exports = function defaultErrorHandler(error, req, res) {
	console.error(err.stack);
    res.status(500).send('Something broke!')
};

