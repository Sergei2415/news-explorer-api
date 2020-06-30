const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 500,
  max: 2,
});
module.exports = limiter;
