const express = require('express');
const fs = require('fs');
const router = express.Router();
const Busboy = require('busboy')
const path = require('path');
const multiparty = require("multiparty")

router.get('',function(req, res, next) {
  
})

router.post('', function(req, res, next){
    
    
    //通过请求头信息创建busboy对象
    let busboy = new Busboy({ headers: req.headers });
    //将流链接到busboy对象
    req.pipe(busboy);
    // let form = new multiparty.Form();
    // form.parse(req, function(err, fields, files) {
    //     console.log('1232',fields, files)
    //     usersID = fields.usersID
    //     houseID = fields.houseID
    // });

    let ret = {
        filename: ''
    }
     //监听file事件获取文件(字段名，文件，文件名，传输编码，mime类型)
     busboy.on('file', function (filedname, file, filename, encoding, mimetype) {
        let name = Date.now() + '-' +filename
        let p = path.resolve(__dirname,'../','public','doc',name)
        ret.filename = name
        console.log(p)
        console.log(filedname,mimetype)
        //创建一个可写流
        let writeStream = fs.createWriteStream(p);
        //监听data事件，接收传过来的文件，如果文件过大，此事件将会执行多次，此方法必须写在file方法里
        file.on('data', function (data) {
            console.log('data')
            writeStream.write(data);
        })

        //监听end事件，文件数据接收完毕，关闭这个可写流
        file.on('end', function (data) {
            console.log('on')
            writeStream.end();
        });
    });
   
    //监听finish完成事件,完成返回数据
    busboy.on('finish', function () {
        console.log('finish')
        res.json(ret)
    });

})

router.put('', function(req, res, next){

})

module.exports = router;