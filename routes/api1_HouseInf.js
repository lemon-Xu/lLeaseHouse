var express = require('express');
var router = express.Router();
const session = require('../sqlSessionFactoryBuilder.js')

router.get('',function(req, res, next) {
  console.log('---get')
  console.log(req.query)
  var inf = {
    House_IsBan: req.query.House_IsBan,
    House_ID: req.query.House_ID,
    Users_Name: req.query.Users_Name
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

router.post('',function(req, res, next) {
  console.log('---post')
  console.log(req.query)
  console.log(req.body)
  let houseInf = req.body.params.houseAllInfInput
  let dealInf = req.body.params.dealInfInput 
  let param = {
    House_Users_ID: houseInf.usersID,
    House_Area: houseInf.area,
    House_AreaType: houseInf.areaType,
    House_Profile: houseInf.profile,
    House_Province: houseInf.province,
    House_District: houseInf.district,
    House_Address: houseInf.address,
    House_Headline: houseInf.title,
    House_Mode: dealInf.leaseType,
    House_LeaseMoney: dealInf.leaseMoney,
    House_ElectronicContractTemplate: dealInf.electronicContract,
    House_CashDeposit: dealInf.cashDeposit
  }
  let param2 = {
    coverImg: houseInf.coverImg.filename 
  }
  let param3 = {
    imgArray: houseInf.imgArray
  }
  
  console.log(param)
  console.log(param2)
  console.log(param3)
  // var inf = {
  //   House_IsBan: req.query.House_IsBan,
  //   House_ID: req.query.House_ID,
  //   Users_Name: req.query.Users_Name
  // }
  // var sql = session.getSQL('selectHouse', inf)
  
  // console.log(sql)
  // session.query(sql, (err, rows, fields)=>{
  //   if(rows == null && rows == undefined)
  //     res.end('查询错误')
  //   else {
  //     res.json(rows)
  //   }

  // })
  res.end()
})


module.exports = router;