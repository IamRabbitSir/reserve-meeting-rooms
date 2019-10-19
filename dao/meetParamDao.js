var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sqlMeetParam = require('./meetParamSqlMapping');
var $sqlMeetRoom = require('./meetRoomSqlMapping');
var $sqlMeetUser = require('./userSqlMapping');

//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

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
    addParam: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接，向表中插入值
            connection.query($sqlMeetParam.insert, [param.meet_continued_time], function(err, result) {
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
    deleteParam: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var param_id = req.query.param_id;
            connection.query($sqlMeetParam.delete, param_id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = {
                        code: 201,
                        msg:'未删除'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    updateParam: function (req, res, next) {
        // update by id
        var param = req.body;
        if(param.param_id == null ||
            param.meet_continued_time ) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sqlMeetParam.update, [param.param_id,
                param.meet_continued_time], function(err, result) {
                // 使用页面进行跳转提示
                if(result && result.affectedRows>0) {
                    result = {
                        code: 200,
                        msg:'更新成功'
                    };
                } else {
                    result = {
                        code: 201,
                        msg:'未更新'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryParamById: function (req, res, next) {
        var meetroom_id = req.query.param_id;
        pool.getConnection(function(err, connection) {
            connection.query($sqlMeetParam.queryById, param_id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryParamAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlMeetParam.queryAll, function(err, result) {
                res.render('gqsMeet',{MeetAll:result,case_name:"meetRoom"});
                connection.release();
            });
        });
    },
    queryParamMeet: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlMeetRoom.query1, function(err, result1) {
                connection.query($sqlMeetUser.queryAllName, function(err, result2) {
                    connection.query($sqlMeetParam.queryMeetTime, function(err, result3) {
                        connection.query($sqlMeetParam.queryMeetStyle, function(err, result4) {
                            //会议室管理员可以是创建者也可以指派其他人
                            //result1 meetroom_id和meetroom_name
                            //result2 us_department和us_name
                            //result3 meet_continued_time=meet_time
                            res.render('gqsMeet', {
                                MeetRoom: result1,
                                MeetAdmin: result2,
                                MeetTime: result3,
                                MeetStyle:result4,
                            });
                            connection.release();
                        });
                    });
                });
            });
        });
    },




}