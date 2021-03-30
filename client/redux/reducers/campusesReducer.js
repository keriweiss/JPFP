import { CREATE_CAMPUS } from '../actions/createCampus';
import { DELETE_CAMPUS } from '../actions/deleteCampus';
import { GET_CAMPUSES } from '../actions/getCampuses';
import { UPDATE_CAMPUS } from '../actions/updateCampus';

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
  if (action.type === UPDATE_CAMPUS) {
    return state.map((campus) =>
      campus.id === action.campus.id ? action.campus : campus
    );
  }
  return state;
};

export default campusesReducer;
