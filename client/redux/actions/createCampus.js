import axios from 'axios';

const CREATE_CAMPUS = 'CREATE_CAMPUS';

const createCampus = (newCampus) => {
  return async (dispatch) => {
    const campusCreated = (await axios.post('/api/campuses', newCampus)).data;
    dispatch(_createCampus(campusCreated));
  };
};

const _createCampus = (campusCreated) => {
  return {
    type: CREATE_CAMPUS,
    campusCreated,
  };
};

export { CREATE_CAMPUS, createCampus };
