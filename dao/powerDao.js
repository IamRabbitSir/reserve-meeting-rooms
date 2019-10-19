var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sqlPower = require('./powerSqlMapping');
var $sqlMenu = require('./menuSqlMapping');

//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function (res, result) {
    if(typeof result === 'undefined') {
        res.render('404');
    } else if(typeof result === 'noResult'){
        res.render('403');
    }else{
        res.json(result);
    }
};

module.exports = {
    addPower: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            var creater = req.session.user.us_name;
            // 建立连接，向表中插入值group_name,group_desc,creater
            connection.query($sqlPower.insert_power, [param.group_name,
                param.group_desc,
                creater], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'添加成功'
                    };
                }else{
                    result = {
                        code: 201,
                        msg:'添加失败'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    deletePower: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var power_id = req.query.power_id;
            connection.query($sqlPower.delete_power, power_id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = {
                        code: 201,
                        msg:'删除失败'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    deleteRealPower: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var power_id = req.query.power_id;
            connection.query($sqlPower.deleteReal_power, power_id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = {
                        code: 201,
                        msg:'删除失败'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    updatePower: function (req, res, next) {
        var param = req.body;
        if(session_us_name == null ||
            param.power_id == null ||
            param.group_name == null ||
            param.group_desc == null) {
            jsonWrite(res,'noResult');
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sqlPower.update_power, [param.group_name, param.group_desc,
                session_us_name,param.power_id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows>0) {
                    result = {
                        code: 200,
                        msg:'更新成功'
                    };
                } else {
                    result = {
                        code: 201,
                        msg:'更新失败'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryPowerOne: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body;
            connection.query($sqlPower.query_powerOne,param.power_id,function(err, result) {
                 res.render('admin-roleGroup-edit',{page:result});
                 connection.release();
            });
        });
    },
    /**queryPowerAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var current_page = 1; //默认为1
            var num = 10; //一页条数
            //当前页
            if (req.query.pageNum) {
                current_page = parseInt(req.query.pageNum);
            }
            //上一页
            var last_page = current_page - 1;
            if (current_page <= 1) {
                last_page = 1;
            }
            //页数
            var pageNum = 1;
            var url = req.originalUrl;
            var path = url.substring(url.indexOf('/'));
            connection.query($sqlMenu.queryMenuName,path,function(err, result) {
                var column = result[0];
                connection.query($sqlPower.queryRecords_power,function(err, result) {
                    var records = result[0].num;
                    //下一页
                    var next_page = current_page + 1;
                    if(records%num>0){
                        pageNum = parseInt(records/num)+1;
                    }else{
                        pageNum = parseInt(records/num);
                    }
                    connection.query($sqlPower.queryAll_power,[num*(current_page-1),num],function(err, result) {
                            var mes = result;
                            var page = {
                                column:column,
                                last_page: last_page,
                                next_page: next_page,
                                current_page: current_page,
                                pageNum : pageNum,
                                records : records,
                                mes: mes,
                            };
                        res.render('admin-roleGroup',{page:page});
                        connection.release();
                    });
                });
            });
        });
    },**/
    queryPowerAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlPower.queryAll_power,function(err, result) {
                var data = {
                    data:result,
                }
                jsonWrite(res, data);
                connection.release();
            });
        });
    },


    queryPowerAllbbbb: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sqlPower.queryAll_powerbbbb,function(err, result) {
                var data = {
                    data:result,
                }
                jsonWrite(res, data);
                connection.release();
            });
        });
    },
};