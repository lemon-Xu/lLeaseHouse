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
  
  session.query(sql, (err, rows, fields)=>{
    if(rows == null && rows == undefined)
      res.end('查询错误')
    else {
      let retJson = rows
      let num2 = retJson.length
      let num3 = retJson.length
      for(let index in retJson){
        let houseID = rows[index].House_ID
        let inf2 = {
          HouseImg_House_ID: houseID
        }
        let inf3 = {
          HouseCoverImg_House_ID: houseID
        }
        let sql2 = session.getSQL('selectHouseImg', inf2)
        let sql3 = session.getSQL('selectHouseCoverImg', inf3)
        session.query(sql2, (err, rows,fields)=>{
          // console.log(sql2)
          // console.log(err)
          // console.log(rows)
          // console.log(fields)
          retJson[index].houseImg = rows
          num2--
          if(num2 == 0 && num3 == 0){
            res.json(retJson)
            num2--
            num3--
          }
        })
        session.query(sql3, (err, rows, fields)=>{
          // console.log(sql3)
          // console.log(err)
          // console.log(rows)
          // console.log(fields)
          retJson[index].houseCoverImg = rows
          num3--
          if(num2 == 0 && num3 == 0){
            res.json(retJson)
            num2--
            num3--
          }
        })
      }
      // console.log(retJson)
      // let sql2 = session.getSQL('selectHouseCoverImg',)
      
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
    House_City: houseInf.city,
    House_District: houseInf.district,
    House_Address: houseInf.address,
    House_Headline: houseInf.title,
    House_ElectronicContractTemplate: houseInf.docName,
    House_Mode: dealInf.leaseType,
    House_LeaseMoney: dealInf.leaseMoney,
    House_CashDeposit: dealInf.cashDeposit,
   
  }
  

  let sql = session.getSQL('insertHouse', param)
 
  console.log(sql)
  session.query(sql, (err, rows, fields)=>{ // 添加房屋信息
    if(rows == null && rows == undefined)
      res.end('房屋信息添加错误')
    else {
      let houseId = rows.insertId
      let param2 = {
        HouseCoverImg_House_ID: houseId,
        HouseCoverImg_FileName: houseInf.coverImg.filename
      }
      param2.HouseImg_House_ID = houseId
      let sql2 = session.getSQL('insertHouseCoverImg', param2)
      console.log(sql2)
      session.query(sql2,(err, rows, fields)=>{ // 添加房屋封面照片
        // console.log(err)
        // console.log(rows)
        // console.log(fields)
      })
      for(let index in houseInf.imgArray){
        let filename = houseInf.imgArray[index].filename
        let param3 = {
          HouseImg_House_ID: houseId,
          HouseImg_FileName: filename
        }
        let sql3 = session.getSQL('insertHouseImg', param3)
        console.log(sql3)
        session.query(sql3,(err, rows, fields)=>{ // 添加房屋照片
          // console.log(err)
          // console.log(rows)
          // console.log(fields)
        })
      }
      res.json(rows)
    }

  })

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
  // res.end()
})


module.exports = router;