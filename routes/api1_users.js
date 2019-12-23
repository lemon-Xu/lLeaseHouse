var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  let params = req.query
  var inf = {
    "Users_Account": params.usersAccount,
    "Users_PassWord": params.usersPass,
    "Users_ID": params.usersId,
    "Users_Rank": params.Users_Rank
  }
  console.log(inf)
  var sql = session.getSQL('selectUsers', inf)
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(rows == null || rows == undefined){
      res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
      res.end('查询错误')
    }
    else if(rows.length != 0){
      // console.log(rows)
      res.json(rows)
    } else {
      res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
      res.end('查询错误')
    }
  })

})

router.post('',function(req, res,) {
  console.log('---post')
  
  let params = req.body.params
  console.log(req.body)
  console.log(params)
  var inf = params
  var sql = session.getSQL('insertUsers', inf)
  
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    let ret = {
      "result": false,
      'mess': 'false'
    }
    console.log(err)
    console.log(rows)
    console.log(fields)
    if(err != null && rows == undefined) {
      ret.mess = "用户名已被注册"
    } else {
      ret.result = true
      ret.mess = "成功"
    }
    res.end(JSON.stringify(ret) )
  })
})

router.delete('',function(req, res,) {
  console.log('---delete')
  console.log(req.body)
  let inf = req.body.params
  let sql = session.getSQL('deleteUsers', inf)
  session.query(sql, (err, rows, fields)=>{
    let ret = {
      "result": false,
      'mess': 'false'
    }
    console.log(err)
    console.log(rows)
    console.log(fields)
    if(err != null && rows == undefined) {
      ret.mess = "删除失败"
    } else {
      ret.result = true
      ret.mess = "删除成功"
    }
    res.end(JSON.stringify(ret) )
  })
})

router.put('',function(req, res,) {
  console.log('---put')
  console.log(req.body)
  let inf = req.body.params
  let sql = session.getSQL('updateUsers', inf)
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    let ret = {
      "result": false,
      'mess': 'false'
    }
    console.log(err)
    console.log(rows)
    console.log(fields)
    if(err != null && rows == undefined) {
      ret.mess = "修改失败"
    } else {
      ret.result = true
      ret.mess = "修改成功"
    }
    res.end(JSON.stringify(ret) )
  })
})

module.exports = router;