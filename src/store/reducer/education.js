import { FETCH_EDUCATION_DATA,REMOVE_EDUCATION_DATA } from "../actions/education";

const initialState = {
  educationData:'',//contains {data:[],error:'',message:''}
}

const educationReducer =(state = initialState, action)=>{
  switch (action.type){
    case FETCH_EDUCATION_DATA:
      return {
        ...state,
        educationData:action.educationData
      };
    case REMOVE_EDUCATION_DATA:
      //remove from the state
      const eduList = state.educationData.data.filter(userEduList=>
        userEduList.id !== action.eduId
      )
      const newData = {...state.educationData,'data':eduList};
      return({
        ...state,
        educationData: newData
      })
    
    default:
  } 
  return state
}

export default educationReducer;