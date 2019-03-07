const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Rotas.
const userRoute = require('./routes/user.routes');

//Porta do servidor.
let port = process.env.PORT || 3000;

//Conexão com o banco de dados.
const mongoose = require('mongoose');
let developmentDatabaseUrl = 'mongodb://admin:abcd1234@ds141815.mlab.com:41815/falafreud_backend_developer_test';
let mongoDB = process.env.MONGODB_URI || developmentDatabaseUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Configurando o app.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', userRoute);

app.listen(port, () => {
    console.log("Server is up and runing on port " + port);
});

module.exports = app;
