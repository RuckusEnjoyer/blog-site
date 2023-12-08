const router = require('express').Router();

const apiRoutes = require('./api');
const httproutes = require('./routes.js');

router.use('/', httproutes);
router.use('/api', apiRoutes);

module.exports = router;
