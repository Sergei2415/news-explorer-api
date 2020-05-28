
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const Routers = require('./routes/index');
const { postusers, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const rateLimit = require('./middlewares/RateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(rateLimit);
app.use(helmet());
app.use(requestLogger);
app.use(cookieParser());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), postusers);
app.use(errors());
app.use(auth);
app.use(Routers);
app.all('*', (req, res) => { res.send(404, { message: 'Запрашиваемый ресурс не найден' }); });
app.use(errorLogger);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const { message } = err;
  if (err.status === 403) {
    return res.status(403).send({ 'Access Denied': message });
  }
  if (err.name === 'AuthorizationError') {
    return res.status(status).send({ 'Authorization Error': message });
  }
  if (err.status === 404) {
    return res.status(status).send({ 'Entry Not Found': message });
  }
  if (err.joi) {
    return res.status(400).send({ 'Validation error': message });
  }
  return res.status(500).send({ 'Unexpected error:': 'На сервере произошла ошибка' });
});
app.listen(PORT, () => {});
