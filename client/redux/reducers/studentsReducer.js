import { CREATE_STUDENT } from '../actions/createStudent';
import { DELETE_STUDENT } from '../actions/deleteStudent';
import { GET_STUDENTS } from '../actions/getStudents';

const studentsReducer = (state = [], action) => {
  if (action.type === GET_STUDENTS) {
    return (state = action.students);
  }
  if (action.type === CREATE_STUDENT) {
    return [...state, action.createdStudent];
  }
  if (action.type === DELETE_STUDENT) {
    return state.filter((student) => student.id !== action.studentId);
  }
  return state;
};

export default studentsReducer;
