var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api1_users');
var bodyParser = require('body-parser') 
var houseLeaseInfRouter = require('./routes/api1_HouseLeaseInf');
var houseInf = require('./routes/api1_HouseInf')

// 中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// 静态文件
app.use('/dist', express.static('dist'))
app.use('/public', express.static('public'))

// 路由
app.use('/', indexRouter);

// api1
app.use('/api1/users', usersRouter);
app.use('/api1/houseInf', houseInf)
app.use('/api1/houseLeaseInf', houseLeaseInfRouter);



app.listen(3000);
