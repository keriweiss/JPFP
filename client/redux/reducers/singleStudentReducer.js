import { GET_SINGLE_STUDENT } from '../actions/getSingleStudent';
import { UPDATE_STUDENT } from '../actions/updateStudent';

const singleStudentReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_STUDENT) {
    return (state = action.student);
  }
  if (action.type === UPDATE_STUDENT) {
    const updatedStudent = {
      ...state,
      ...action.student,
    };
    return updatedStudent;
  }
  return state;
};

export default singleStudentReducer;
