/**
 * Module dependencies
 */
const express = require('express');
const ping = require('./routes/ping');
const pokemon = require('./routes/pokemon');
const types = require('./routes/types');
const logger = require('winston-this')('index');
const config = require('config');
const erroHandler = require('./middlewares/errorHandler');

// Create application
const app = express();
const port = config.get('port');

// Add the routes
app.use('/pokemon', pokemon);
app.use('/types', types);
app.use('/ping', ping);

// Adding error handler middleware
app.use(erroHandler);

// Expose the application
app.listen(port);

logger.info(`Application start on port ${port}`);
