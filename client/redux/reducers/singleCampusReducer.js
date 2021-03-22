import { GET_SINGLE_CAMPUS } from '../actions/getSingleCampus';

const singleCampusReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_CAMPUS) {
    return (state = action.campus);
  }
  return state;
};

export default singleCampusReducer;
