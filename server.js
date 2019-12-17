const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const PORT = 3001;

const app = express();
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log(`Server is running on port ${PORT}`)
});