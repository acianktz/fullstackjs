/**
 * Module dependencies
 */
const express = require('express');
const ping = require('./routes/ping');
const pokemon = require('./routes/pokemon');
const logger = require('winston-this')('index');
const config = require('config');

// Create application
const app = express();
const port = config.get('port');

// Add the routes
app.use('/', pokemon);
app.use('/ping', ping);

// Expose the application
app.listen(port);

logger.info(`Application start on port ${port}`);
