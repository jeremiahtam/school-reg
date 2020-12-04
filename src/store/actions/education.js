import {tokenConfirmationHandler} from '../../functions/tokenConfirmationHandler'

export const FETCH_EDUCATION_DATA = 'FETCH_EDUCATION_DATA'

export const fetchEducationData = () =>{
  return async dispatch => {
    const tokenData = await tokenConfirmationHandler('student');
    const studentId = await tokenData.info.data.id

    const values = {
      studentId,
      'actionType':'get-education-data'
    }
    try{
      const res = await fetch('http://localhost/school-reg/src/api/education-action.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const resData  = await res.json();
      dispatch({type:FETCH_EDUCATION_DATA,educationData:resData});

    }catch(error){
      throw error;
    }    
  }
}