'use strict';

const mongoose = require('mongoose');
const circuitBreaker = require('opossum');

const breaker = circuitBreaker(() => {
    //Connects with database
    let mongoDB = process.env.MONGODB_URI;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true
    });
    mongoose.Promise = global.Promise;
}, {
    timeout: 10000, //If our function takes longer than 10 seconds, trigger a failure
    errorThresholdPercentage: 50, //When 50% of requests fail, trip the circuit
    resetTimeout: 30000 //After 30 seconds, try again
});

//If searchHandler.searchForHashtag starts to fail, firing the breaker will trigger our fallback function
breaker.fallback(() => '[MongoDB Service] - Sorry, out of service right now');
breaker.on('fallback', (result) => {
    console.log(result);
});

module.exports = () => {
    breaker.fire().then(() => {
        mongoose.connection.on('connected', () => {
            console.log("[MongoDB Service] - database connected");
        });
    });
}