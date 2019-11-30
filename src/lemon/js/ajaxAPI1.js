import axios from 'axios'
const loginAPI1 = (resFun, errFun, params)=>{
    axios.get('/api1/users', {
        "params": params
      })
        .then(function (res) {
          if(resFun != null && resFun != undefined)
            resFun(res)
        })
        .catch(function (err) {
          if(errFun != null && errFun != undefined)
            errFun(err)
        })
}

const getHouseInfAPI1 = (resFun, errFun, params)=>{
  axios.get('/api1/HouseInf', {
    "params": params
  })
    .then(function (res) {
      if(resFun != null && resFun != undefined)
        resFun(res)
    })
    .catch(function (err) {
      if(errFun != null && errFun != undefined)
        errFun(err)
    })
}


export {loginAPI1, getHouseInfAPI1}