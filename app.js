// 加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// 加载路由控制
var index = require('./routes/index');
var users = require('./routes/users');
var meet = require('./routes/meet');
var meeting = require('./routes/meeting');
var menu = require('./routes/menu');
var Organization = require('./routes/Organization');
var power = require('./routes/power');
// 创建项目实例
var app = express();
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser('sessionS'));
// 定义session解析器
app.use(session({
    secret: 'sessionS',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000*60*120 // default session expiration is set to 1 hour
    },
}));
//session传递给前台页面
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//登录拦截器
app.use(function (req,res,next) {
    var url = req.originalUrl;
    var userSession = req.session.user;
    if(!userSession){
        if(url == "/login" || url == "/users/login" || url == "/" || url == "/index" || url == "/register" || url == "/users/logout" || url.substring(0,url.indexOf('?')) == "/users/have" || url == "/users/register"){
            next();
        }else{
            res.redirect("/login");
        }
    }else if(userSession){
        next();
    };
});
// 匹配路径和路由
app.use('/', index);
app.use('/users', users);
app.use('/meet',meet);
app.use('/meeting',meeting);
app.use('/menu',menu);
app.use('/Organization',Organization);
app.use('/power',power);
// 404错误处理
app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
});
// 开发环境，500错误处理和错误堆栈跟踪
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// 输出模型app
module.exports = app;
