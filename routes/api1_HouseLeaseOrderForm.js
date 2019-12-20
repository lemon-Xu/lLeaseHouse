var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  let params = req.query
  let sql = session.getSQL('selectHouseLeaseOrderForm', params)
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    if(err){
      res.json('订单查询错误')
    }
    else {
      res.json(rows)
    }
  })
})

router.post('',function(req, res,) {
  console.log('---post')
  
  let params = req.body.params
  let sql = session.getSQL('insertHouseLeaseOrderForm', params)
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{
    console.log(err)
    console.log(rows)
    console.log(fields)
  })
  res.json()

  res.json()
})

router.delete('',function(req, res,) {
  console.log('---delete')
  console.log(req.body)
  let inf = req.body.params


  res.json()
})

router.put('',function(req, res,) {
  console.log('---put')
  console.log(req.body)

  res.json()
  
})

module.exports = router;