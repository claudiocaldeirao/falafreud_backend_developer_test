'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

//Conexão com o banco de dados.
const database = require('./persistence/database/database');
//Runs database conection
database();

//Enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static file declaration
app.use(express.static(path.join(__dirname, 'docs/apidoc')));

//In production
if (process.env.NODE_ENV === "production") {
    //Security settings
    require('./security');
};

//Documentation
app.get('/docs/apidoc', (req, res) => {
    res.sendFile(path.join(__dirname + '/docs/apidoc/index.html'));
});

const userRoute = require('./routes/user.routes');
//Config users route
app.use('/users', userRoute);

//Handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

module.exports = app;