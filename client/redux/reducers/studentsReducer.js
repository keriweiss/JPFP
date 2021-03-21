import { GET_STUDENTS } from '../actions/getStudents';

const studentsReducer = (state = [], action) => {
  if (action.type === GET_STUDENTS) {
    return (state = action.students);
  }
  return state;
};

export default studentsReducer;
