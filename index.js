const winston = require('winston');
const express = require('express');
const app = express();
app.use(express.static("public"))

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3002;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;