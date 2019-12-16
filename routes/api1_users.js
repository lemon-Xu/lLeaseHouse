var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  var inf = {
    "Users_Account": req.query.usersAccount,
    "Users_PassWord": req.query.usersPass,
    "Users_ID": req.query.usersId
  }
  var sql = session.getSQL('selectUsers', inf)
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(rows == null || rows == undefined)
      res.end('查询错误')
    else if(rows.length != 0){
      console.log(rows)
      var ret = {
        "usersID": rows[0].Users_ID,
        "usersAccount": rows[0].Users_Account,
        "usersName": rows[0].Users_Name,
        "usersIsBan": rows[0].Users_IsBan
      }
      res.json(ret)
    }
      res.end('查询错误')
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
  var ret = {
    "usersName": req.body.usersName,
    "usersPass": req.body.usersPass,
    "usersRank": req.body.usersRank
  }

  res.end(JSON.stringify(ret))
})

router.put('',function(req, res,) {
  console.log('---put')
  console.log(req.body)
  var ret = {
    "usersName": req.body.usersName,
    "usersPass": req.body.usersPass,
    "usersRank": req.body.usersRank
  }

  res.end(JSON.stringify(ret))
})

module.exports = router;