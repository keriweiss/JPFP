import { CREATE_STUDENT } from '../actions/createStudent';
import { GET_STUDENTS } from '../actions/getStudents';

const studentsReducer = (state = [], action) => {
  if (action.type === GET_STUDENTS) {
    return (state = action.students);
  }
  if (action.type === CREATE_STUDENT) {
    return [...state, action.createdStudent];
  }
  return state;
};

export default studentsReducer;
