import { CREATE_CAMPUS } from '../actions/createCampus';
import { GET_CAMPUSES } from '../actions/getCampuses';

const campusesReducer = (state = [], action) => {
  if (action.type === GET_CAMPUSES) {
    return (state = action.campuses);
  }
  if (action.type === CREATE_CAMPUS) {
    return [...state, action.campusCreated];
  }
  return state;
};

export default campusesReducer;
