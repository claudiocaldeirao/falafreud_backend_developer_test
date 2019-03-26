'use strict';

const rateLimit = require('express-rate-limit');
const secure = require('express-secure-only');
const helmet = require('helmet');

module.exports = (app) => {
    app.enable('trust proxy');

    //Forces app to run on https
    app.use(secure());

    //Set http headers security, using helmet default settings
    app.use(helmet());

    //Sets request rate limit
    app.use('/api/v1', rateLimit({
        windowMs: 30 * 1000,
        delayMs: 0,
        max: 6,
        message: JSON.stringify({
            error: 'Too many requests, please try again in 30 seconds.',
            code: 429
        })
    }));
};