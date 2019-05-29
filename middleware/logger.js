const moment = require('moment');

// middleware is ran after every request
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  next();
};

module.exports = logger;
