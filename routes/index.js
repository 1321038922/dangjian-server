var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/adminUser', require('../controller/adminUser'))
router.use('/admin/news', require('../controller/news'))
router.use('/admin/category', require('../controller/category'))
router.use('/admin/slider', require('../controller/slider'))

module.exports = router;
