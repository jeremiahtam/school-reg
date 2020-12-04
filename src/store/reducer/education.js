import { FETCH_EDUCATION_DATA } from "../actions/education";

const initialState = {
  educationData:'',
}

const educationReducer =(state = initialState, action)=>{
  switch (action.type){
    case FETCH_EDUCATION_DATA:
      return {
        ...state,
        educationData:action.educationData
      }
    default:
  } 
  return state
}

export default educationReducer;