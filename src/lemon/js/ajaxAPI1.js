import axios from 'axios'
const loginAPI1 = (usersName, usersPass, resFun, errFun)=>{
    axios.get('/api1/users', {
        params: {
          "usersAccount": usersName,
          "usersPass": usersPass
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

export {loginAPI1}