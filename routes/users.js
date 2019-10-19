var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');


router.get('/userManage', function(req, res, next) {
    res.render('admin-users');
});
router.get('/information', function(req, res, next) {

});
router.get('/update', function(req, res, next) {
    res.render('updateUser', { title: '修改用户' });
});//获取当前用户数据（传入us_id）
router.get('/addUser', function(req, res, next) {
    userDao.add(req,res,next);
});//添加用户(需要表单提交用户相关数据)
router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});//查询所有用户
router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});//查询用户(需要表单提交us_id)
router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});//删除用户(需要表单提交us_id)
router.get('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});//修改用户(需要表单提交用户所有数据)
router.post('/login', function(req, res, next) {
    userDao.login(req, res, next);
});//登录
router.post('/register', function(req, res, next) {
    userDao.add(req, res, next);
});//登录
router.get('/logout', function(req, res, next) {
    userDao.logout(req, res, next);
});//注销
router.get('/myinfo', function(req, res, next) {
    userDao.queryBySession(req, res, next);
});//获取当前登录用户信息
router.get('/have', function(req, res, next) {
    userDao.queryHave(req, res, next);
});//查询用户名是否存在



module.exports = router;
