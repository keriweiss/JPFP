import { CREATE_STUDENT } from '../actions/createStudent';
import { DELETE_STUDENT } from '../actions/deleteStudent';
import { FILTER_SORT_STUDENTS } from '../actions/filterSortStudent';
import { GET_STUDENTS } from '../actions/getStudents';
import { UPDATE_STUDENT } from '../actions/updateStudent';

const studentsReducer = (state = [], action) => {
  if (action.type === GET_STUDENTS) {
    return (state = action.students);
  }
  if (action.type === CREATE_STUDENT) {
    return [action.createdStudent, ...state];
  }
  if (action.type === DELETE_STUDENT) {
    return state.filter((student) => student.id !== action.studentId);
  }
  if (action.type === UPDATE_STUDENT) {
    return state.map((student) =>
      student.id === action.student.id ? action.student : student
    );
  }
  if (action.type === FILTER_SORT_STUDENTS) {
    return (state = action.students.slice());
  }
  return state;
};

export default studentsReducer;
