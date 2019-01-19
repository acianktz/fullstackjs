const logger = require('winston-this')('error-handler');

module.exports = (err, req, res, next) => {
  logger.error(`An error occurred: ${err.message}: ${err.stack}`);

  res.status(500).json({
    message: err.message,
  });
};
