import { CREATE_CAMPUS } from '../actions/createCampus';
import { DELETE_CAMPUS } from '../actions/deleteCampus';
import { GET_CAMPUSES } from '../actions/getCampuses';

const campusesReducer = (state = [], action) => {
  if (action.type === GET_CAMPUSES) {
    return (state = action.campuses);
  }
  if (action.type === CREATE_CAMPUS) {
    return [...state, action.campusCreated];
  }
  if (action.type === DELETE_CAMPUS) {
    return state.filter((campus) => campus.id !== action.campusId);
  }
  return state;
};

export default campusesReducer;
