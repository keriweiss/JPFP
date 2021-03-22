import { GET_SINGLE_STUDENT } from '../actions/getSingleStudent';

const singleStudentReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_STUDENT) {
    return (state = action.student);
  }
  return state;
};

export default singleStudentReducer;
