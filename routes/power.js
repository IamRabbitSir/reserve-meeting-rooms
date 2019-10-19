var express = require('express');
var router = express.Router();
var powerDao = require('../dao/powerDao');
var menuDao = require('../dao/menuDao');

//管理权限组
router.get('/powerManage', function(req, res, next) {
    menuDao.queryCurrentPath(req,res,next);
});
router.get('/getPower', function(req, res, next) {
    powerDao.queryPowerAll(req,res,next);
});
router.post('/addPower', function(req, res, next) {
    powerDao.addPower(req,res,next);
});
router.post('/editPower', function(req, res, next) {
    powerDao.updatePower(req,res,next);
});










//权限组分配
router.get('/setPermissions', function(req, res, next) {
    menuDao.queryCurrentPath(req,res,next);
});
router.get('/set', function(req, res, next) {
    powerDao.queryPowerAllbbbb(req,res,next);
});



//地址跳转
router.get('/add', function(req, res, next) {
    res.render('admin-roleGroup-add');
});
router.get('/edit', function(req, res, next) {
    //获取数据
    powerDao.queryPowerOne(req,res,next);
});

module.exports = router;