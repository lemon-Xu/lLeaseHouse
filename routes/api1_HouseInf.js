var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  var inf = {
    "House_IsBan": req.query.House_IsBan
  }
  var sql = session.getSQL('selectHouse', inf)
  
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(rows == null && rows == undefined)
      res.end('查询错误')
    else {
      res.json(rows)
    }

  })
})


module.exports = router;