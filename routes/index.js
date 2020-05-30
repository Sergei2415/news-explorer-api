const router = require('express').Router();
const articlerouter = require('./article');
const userrouter = require('./users');
const authorizationrouter = require('./authorization');
const resourcenotfound = require('./resourcenotfound');
const auth = require('../middlewares/auth');

router.use(authorizationrouter);
router.use(auth);
router.use(articlerouter);
router.use(userrouter);
router.use(resourcenotfound);

module.exports = router;
