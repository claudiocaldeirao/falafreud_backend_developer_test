'use strict';

require('dotenv').config();

const server = require('./app');

//Server port
let port = process.env.PORT || 5000;

//Listening
server.listen(port, () => console.log(`Server is up and runing on port ${port}`));