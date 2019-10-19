//dao/meetDao.js
//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./meetRoomSqlMapping');

//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//
var jsonWrite = function (res, result) {
    if(typeof result === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(result);
    }
};