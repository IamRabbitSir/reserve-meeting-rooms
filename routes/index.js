var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
    res.render('index');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.get('/register', function(req, res, next) {
    userDao.queryDepartment(req, res, next);
});
router.get('/404', function(req, res, next) {
    res.render('404');
});
module.exports = router;
