const router = require('express').Router();
const articlerouter = require('./article');
const userrouter = require('./users');

router.use(articlerouter);
router.use(userrouter);
module.exports = router;
