var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sqlMenu = require('./menuSqlMapping');
var $sqlUser = require('./userSqlMapping');
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
    addMenu: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接，向表中插入值
            connection.query($sqlMenu.insert, [param.meetroom_name,
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
    deleteMenu: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var us_id = req.query.meetroom_id;
            connection.query($sqlMenu.delete, meetroom_id, function(err, result) {
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
    updateMenu: function (req, res, next) {
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
            connection.query($sqlMenu.update, [param.meetroom_id,
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
    },
    queryMenuById: function (req, res, next) {
        var meetroom_id = req.query.meetroom_id;
        pool.getConnection(function(err, connection) {
            connection.query($sqlMenu.queryById, meetroom_id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
//menu_id,menu_name,menu_level,menu_parent_id,menu_path,
//isEnable,allowEdit,allowDelete,sortCode,creater,create_day
    queryAllMenuOneMy: function (req, res, next) {
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
        console.log(us_id);
        pool.getConnection(function(err, connection) {
            connection.query($sqlUser.queryById_group, us_id, function(err, result) {
               connection.query($sqlMenu.queryMenuOneMy,result[0].power_id,function(err, result) {
                      var oneMenus_node = result;
                      res.json(oneMenus_node);
                      connection.release();
               });
            });
        });
    },
    queryAllMenuTwoMy: function (req, res, next) {
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
            connection.query($sqlUser.queryById_group, us_id, function(err, result) {
                connection.query($sqlMenu.queryMenuTwoMy,result[0].power_id,function(err, result) {
                    var twoMenus_node = result;
                    res.json(twoMenus_node);
                    connection.release();
                });
            });
        });
    },
    queryAllMenu: function (req, res, next) {
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
            connection.query($sqlUser.queryById_group, us_id, function(err, result) {
                var power_id = result[0].power_id;
                var power_name = result[0].group_name;
                connection.query($sqlMenu.queryMenuOneMy,power_id,function(err, result) {
                    var data = result;
                    connection.query($sqlMenu.queryMenuTwoMy,power_id,function(err, result) {
                        var data2 = result;
                        res.render("gqsMeet",{power_name:power_name,data:data, data2: data2});
                        connection.release();
                    });
                });
            });
        });
    },
    queryCurrentPath: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var url = req.originalUrl;
            var path = url.substring(url.indexOf('/'));
            console.log(path);
            connection.query($sqlMenu.queryMenuName,path,function(err, result) {
                var column = result[0];
                var jade = column.menu_jade;
                console.log(jade);
                var page = {
                    column:column,
                };
                res.render(jade,{page:page});
                connection.release();
            });
        });
    },



};