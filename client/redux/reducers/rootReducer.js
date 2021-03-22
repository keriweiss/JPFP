import studentsReducer from './studentsReducer';
import campusesReducer from './campusesReducer';
import singleCampusReducer from './singleCampusReducer';
import { combineReducers } from 'redux';
import singleStudentReducer from './singleStudentReducer';

const rootReducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
  campus: singleCampusReducer,
  student: singleStudentReducer,
});

export default rootReducer;
