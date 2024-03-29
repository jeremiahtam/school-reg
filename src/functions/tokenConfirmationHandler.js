import axios from 'axios'

export async function tokenConfirmationHandler(user) {
  /* get loginInfo from local storage */
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  /* if loginInfo exists */
  if(loginInfo){
    const loginToken = loginInfo.loginToken;
    const userType = loginInfo.userType;
    /* if userType is not a student, redirect */
    if(userType===user){
      if(loginToken){
        try{
        /* check if it is still valid */
        const res = await axios({
          url:'http://localhost/school-reg/src/api/protected.php',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${loginToken}`
          },
          data: {
            'jwt':loginToken
          }
        })
        const resData  = await res.data
        if(resData.error===false){
            return resData
          }else{
            /* return resData */
            return resData
          }
        }catch(error){
          return {
            'error':true,
            'message':error
          };
        }
      }else{
        /* return error data */
        return {
          "error":true,
          'message':'No login token'
        }
      }  
    }else{
      /* return error data */
      return {
        "error":true,
        "message":'Incorrect user type'
      }
    }

  }else{
    /* return error data */
    return {
      "error":true,
      "message":'No data in local storage'
    }
  }
}


