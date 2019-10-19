//dao/userDao.js
//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

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
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            // 建立连接，向表中插入值
            console.log(param.us_account+" "+param.us_psw+" "+param.us_name+" "+param.us_sex+" "+param.us_phone+" "+param.us_email+" "+param.team_id+" "+param.us_position);
            connection.query($sql.insert,[param.us_account, param.us_psw, param.us_name, param.us_sex, param.us_phone, param.us_email, param.team_id, param.us_position], function(err, result) {
                if(result) {
                    result = {
                        code:'200',
                        msg:'注册成功'
                    };
                }else{
                    result = {
                        code:'201',
                        msg:'注册失败'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var us_id = req.query.us_id;
            connection.query($sql.delete, us_id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: '200',
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
    update: function (req, res, next) {
        // update by id
        var param = req.body;

        if(param.us_id == null ||
            param.us_account == null ||
            param.us_psw == null ||
            param.us_name == null ||
            param.us_sex == null ||
            param.team_id == null ||
            param.us_position == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.us_id,
                param.us_account, param.us_psw, param.us_name,
                param.us_sex, param.us_phone, param.us_email,
                param.team_id, param.us_position], function(err, result) {
                // 使用页面进行跳转提示
                console.log(result.affectedRows);
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

    },
    queryBySession: function (req, res, next) {
        var session_us_id = req.session.user.us_id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, session_us_id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        var us_id = req.query.us_id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, us_id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //查询当前用户的权限组
    queryById_group: function (req, res, next) {
        var groupName = "";
        if(req.session.user.us_id){
            var us_id = req.session.user.us_id;
        }else{
            result = {
                code:"201",
                msg:'用户登录超时'
            };
            res.json(result);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById_group, us_id, function(err, result) {
                res.json(result);
                connection.release();
            });
        });
        return groupName;
    },
    queryHave: function (req, res, next) {
        var us_account = req.query.us_account;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByUs_account, us_account, function (err, result) {
                if (!result || result.length === 0) {
                    return jsonWrite(res, {
                        "code":"YES",
                    });
                }else{
                    return jsonWrite(res, {
                        "code":"NO",
                    });
                }
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    login: function (req, res, next) {
        var param = req.body;
        var us_account = param.us_account;
        var us_psw = param.us_psw;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByUs_account, us_account, function (err, result) {
                if (!result || result.length === 0) {
                    return jsonWrite(res, {
                        code: '0',
                        msg: '您输入的用户名不存在，请确认！'
                    });
                }
                connection.query($sql.queryByA_P, [us_account, us_psw], function (err, result) {
                    if (result.length != 0) {
                        var us_id = result[0].us_id;
                        var us_name = result[0].us_name;
                        result = {
                            us_id: us_id,
                            us_name: us_name,
                            code: '1',
                            msg: '登录成功！'
                        };
                        req.session.user = {
                            us_id:us_id,
                            us_name:us_name,
                        };
                    } else {
                        result = {
                            code: '0',
                            msg: '登录失败：您输入的用户名或密码错误！'
                        };
                    }
                    jsonWrite(res, result);
                    connection.release();
                });

            });
        });
    },
    logout: function (req, res, next) {
        //删除session
        req.session.destroy();
        res.redirect("/login");
    },
    queryDepartment: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryDepartment, function(err, result) {
                //console.log(result);
                res.render('register',{Department:result});
                connection.release();
            });
        });
    },

};
