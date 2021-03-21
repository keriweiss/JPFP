import { GET_CAMPUSES } from '../actions/getCampuses';

const campusesReducer = (state = [], action) => {
  if (action.type === GET_CAMPUSES) {
    return (state = action.campuses);
  }
  return state;
};

export default campusesReducer;
