import studentsReducer from './studentsReducer';
import campusesReducer from './campusesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
});

export default rootReducer;
