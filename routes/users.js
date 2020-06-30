
const router = require('express').Router();

const { getusers } = require('../controllers/users');

router.get('/users/me', getusers);// здесь не стал реализовывать схему, так как ничего не передаем

module.exports = router;
