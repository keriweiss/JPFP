import axios from 'axios';

const CREATE_CAMPUS = 'CREATE_CAMPUS';

const createCampus = (newCampus) => {
  return async (dispatch) => {
    try {
      const campusCreated = (await axios.post('/api/campuses', newCampus)).data;
      dispatch(_createCampus(campusCreated));
    } catch (err) {
      console.error(err);
    }
  };
};

const _createCampus = (campusCreated) => {
  return {
    type: CREATE_CAMPUS,
    campusCreated: { ...campusCreated, students: [] },
  };
};

export { CREATE_CAMPUS, createCampus };
