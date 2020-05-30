
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routers = require('./routes/index');

const rateLimit = require('./middlewares/RateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorhandler = require('./ErrorHandler');

let BASE_ADDRESS;
if (process.env.NODE_ENV !== 'production') BASE_ADDRESS = 'mongodb://localhost:27017/mestodb';
else BASE_ADDRESS = process.env.BASE_ADDRESS || 'mongodb://localhost:27017/mestodb';

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(BASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(rateLimit);
app.use(helmet());
app.use(requestLogger);
app.use(cookieParser());

app.use(routers);
app.use(errors());
app.use(errorLogger);

app.use(errorhandler);
app.listen(PORT);
