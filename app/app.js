const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorMiddleware = require('./middleware/errors');

// Create Express App
const app = express();

// Pre Middleware
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Post Middleware
app.use(errorMiddleware.errorHandler);

module.exports = app;
