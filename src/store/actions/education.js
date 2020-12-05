import axios from 'axios'

export const FETCH_EDUCATION_DATA = 'FETCH_EDUCATION_DATA'

export const fetchEducationData = (studentId) =>{
  return async dispatch => {
    const values = {
      studentId,
      'actionType':'get-education-data'
    }
    try{
      const res = await axios({
        url:'http://localhost/school-reg/src/api/education-action.php',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: values
      })
      const resData  = await res.data;
      //console.log(resData)
      dispatch({
        type:FETCH_EDUCATION_DATA,
        educationData:resData
      });

    }catch(error){
      throw error;
    }    
  }
}