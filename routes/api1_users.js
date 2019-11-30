var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  var inf = {
    "Users_Account": req.query.usersAccount,
    "Users_PassWord": req.query.usersPass,
  }
  var sql = session.getSQL('selectUsers', inf)
  
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(rows == null && rows == undefined)
      res.end('查询错误')
    else {
      var ret = {
        "usersID": rows[0].Users_ID,
        "usersAccount": rows[0].Users_Account,
        "usersName": rows[0].Users_Name,
        "usersIsBan": rows[0].Users_IsBan
      }
      res.json(ret)
    }

  })

})

router.post('',function(req, res,) {
  console.log('---post')
  console.log(req.body)
  var inf = {
    "Users_Account": req.query.usersA18ccount,
    "Users_PassWord": req.query.usersPass,
    "Users_Rank": req.query.usersRank
  }
  var sql = session.getSQL('selectUsers', inf)
  
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    for(var a in rows){
      console.log(rows[a])
    }
    res.end(JSON.stringify(rows) )
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