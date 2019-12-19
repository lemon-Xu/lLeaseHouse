import axios from 'axios'
const loginAPI1 = (resFun, errFun, params)=>{
  let usersAccount = params.usersAccount
  let usersPass = params.usersPass
  console.log(usersAccount+usersPass)
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

const usersRegisterAPI1 = (resFun, errFun, params)=>{
  axios.post('/api1/users', {
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

const getUsersInfAPI1 = (resFun, errFun, params)=>{
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

const putUsersInfAPI1 = (resFun, errFun, params)=>{
  axios.put('/api1/users', {
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

const deleteUsersInfAPI1 = (resFun, errFun, params)=>{
  axios.delete('/api1/users', {
    data: {
      params: params
    }
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

const getUsersFollowInfAPI1 = (resFun, errFun, params)=>{
  axios.get('/api1/usersFollow', {
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

const postHouseInfImgAPI1 = (resFun, errFun, params)=>{
  axios.get('/api1/HouseInfimg', {
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

const postHouseInfAPI1 = (resFun, errFun, params)=>{
  axios.post('/api1/houseInf', {
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

const getHouseImgArray = (resFun, errFun, params)=>{
  axios.post('/api1/houseInf', {
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

const getHouseCoverImg = (resFun, errFun, params)=>{
  axios.post('/api1/houseInf', {
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

export { loginAPI1, usersRegisterAPI1, getUsersInfAPI1, putUsersInfAPI1,getUsersFollowInfAPI1, getHouseInfAPI1, postHouseInfImgAPI1, postHouseInfAPI1, deleteUsersInfAPI1}