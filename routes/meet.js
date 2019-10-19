var express = require('express');
var router = express.Router();
var meetDao = require('../dao/meetDao');
var meetParam = require('../dao/meetParamDao');
var menuDao = require('../dao/menuDao');

router.get('/gqsMeet/default', function(req, res, next) {
    res.render('default');
});
router.get('/gqsMeet', function(req, res, next) {
    menuDao.queryAllMenu(req,res,next);
});
//查看会议室
router.get('/gqsMeet/meetRoom', function(req, res, next) {
    meetDao.queryMeetAll(req,res,next);
});
//预订会议室
router.get('/gqsMeet/meetBook', function(req, res, next) {
    meetParam.queryParamMeet(req,res,next);
});
//会议室管理
router.get('/meetManage', function(req, res, next) {
    meetParam.queryParamMeet(req,res,next);
});
//会议室预览
router.get('/meetList', function(req, res, next) {
    meetParam.queryParamMeet(req,res,next);
});


module.exports = router;