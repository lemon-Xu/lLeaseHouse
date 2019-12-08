var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')
const Cookie = require('js-cookie')
router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  var inf = {
    
  }
  var sql = session.getSQL('selectUsersFollow', inf)
  
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(rows == null || rows == undefined)
      res.end('查询错误')
    else {
      res.json(rows)
    }

  })
})
router.post('',function(req, res, next) {
    console.log('---get')
    console.log(req.query)
    var inf = {
      "UsersFollow_Users_ID": req.query.usersID
    }
    var sql = session.getSQL('insertUsersFollow', inf)
    
    console.log(sql)
    session.query(sql, (err, rows, fields)=>{
      if(rows == null || rows == undefined)
        res.end('查询错误')
      else {
        res.json(rows)
      }
  
    })
  })


module.exports = router;