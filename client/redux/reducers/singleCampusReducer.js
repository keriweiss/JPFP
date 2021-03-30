import { GET_SINGLE_CAMPUS } from '../actions/getSingleCampus';
import { UPDATE_CAMPUS } from '../actions/updateCampus';
import { UPDATE_STUDENT } from '../actions/updateStudent';

const singleCampusReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_CAMPUS) {
    return (state = action.campus);
  }
  if (action.type === UPDATE_CAMPUS) {
    const updatedCampus = {
      ...state,
      ...action.campus,
    };
    return updatedCampus;
  }
  if (action.type === UPDATE_STUDENT) {
    if (state.id) {
      const updatedCampusStudents = state.students.filter(
        (student) => student.id !== action.student.id
      );
      return { ...state, students: updatedCampusStudents };
    }
  }
  return state;
};

export default singleCampusReducer;
