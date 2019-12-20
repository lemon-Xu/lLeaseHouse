const path = require('path');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api1_users');
const bodyParser = require('body-parser') 
const houseLeaseInfRouter = require('./routes/api1_HouseLeaseInf');
const houseInf = require('./routes/api1_HouseInf')
const imgRouter = require('./routes/api1_img')
const usersFollow = require('./routes/api1_usersFollow')
const houseLeaseOrderForm = require('./routes/api1_HouseLeaseOrderForm')
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
app.use('/api1/houseInf', houseInf);
app.use('/api1/img', imgRouter);
app.use('/api1/houseLeaseInf', houseLeaseInfRouter);
app.use('/api1/usersFollow', usersFollow);
app.use('/api1/houseLeaseOrderForm', houseLeaseOrderForm)
app.listen(3000);
