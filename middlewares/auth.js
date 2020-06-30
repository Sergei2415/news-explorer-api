
const jwt = require('jsonwebtoken');

const { AuthorizationError } = require('../errors/AuthorizationError');


const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация!'));
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    let JWT_SECRET;
    if (process.env.NODE_ENV !== 'production') JWT_SECRET = '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
    else JWT_SECRET = process.env.JWT_SECRET || '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('Ваш токен был написан с ошибкой, либо просрочен.'));
  }

  req.user = payload;

  return next();
};
