
const router = require('express').Router();

const { EntryNotFound } = require('../errors/EntryNotFound');

router.all('*', (req, res, next) => next(new EntryNotFound('Запрашиваемый ресурс не найден')));

module.exports = router;
