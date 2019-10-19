var express = require('express');
var async = require('async');
var Q = require('q');
var router = express.Router();
var menuDao = require('../dao/menuDao');
var userDao = require('../dao/userDao');

router.get('/menuManage', function(req, res, next) {
    res.render("");
});

//一级菜单
router.post('/menuOne', function(req, res, next) {
    menuDao.queryAllMenuOneMy(req, res, next);
});
//二级菜单
router.post('/menuTwo', function(req, res, next) {
    menuDao.queryAllMenuTwoMy(req, res, next);
});
//菜单list
router.post('/menuTwo', function(req, res, next) {
    menuDao.queryAllMenuTwoMy(req, res, next);
});


module.exports = router;