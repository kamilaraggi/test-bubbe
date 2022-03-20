const router = require('express').Router();

const siteRoutes = require('./site-routes');

router.use('/', siteRoutes);



module.exports = router;
