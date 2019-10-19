//dao/meetDao.js
//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sqlMeet = require('./meetRoomSqlMapping');
var $sqlMeeting = require('./meetingSqlMapping');

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

module.exports = {
    addMeet: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接，向表中插入值
            connection.query($sqlMeet.insert, [param.meetroom_name,
                param.meetroom_addr,
                param.meetroom_num,
                param.meetroom_remark], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    deleteMeet: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var us_id = req.query.meetroom_id;
            connection.query($sqlMeet.delete, meetroom_id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    updateMeet: function (req, res, next) {
        // update by id
        var param = req.body;
        if(param.meetroom_id == null ||
            param.meetroom_name == null ||
            param.meetroom_addr == null ||
            param.meetroom_num == null ||
            param.meetroom_remark == null ) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sqlMeet.update, [param.meetroom_id,
                param.meetroom_name, param.meetroom_addr, param.meetroom_num,
                param.meetroom_remark], function(err, result) {
                // 使用页面进行跳转提示
                if(result && result.affectedRows>0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                connection.release();
            });
        });
//meetroom_id,meetroom_name,meetroom_addr,meetroom_num,meetroom_remark
    },
    queryMeetById: function (req, res, next) {
        var meetroom_id = req.query.meetroom_id;
        pool.getConnection(function(err, connection) {
            connection.query($sqlMeet.queryById, meetroom_id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryMeetAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlMeet.queryAll, function(err, result) {
                //jsonWrite(res, result);
                //res.send(result);
                res.render('gqsMeet');
                connection.release();
            });
        });
    },
};