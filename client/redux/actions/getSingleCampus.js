import axios from 'axios';

const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';

const getSingleCampus = (campusId) => {
  return async (dispatch) => {
    try {
      const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
      dispatch(_getSingleCampus(campus));
    } catch (err) {
      console.error(err);
    }
  };
};

const _getSingleCampus = (campus) => {
  return {
    type: GET_SINGLE_CAMPUS,
    campus,
  };
};

export { GET_SINGLE_CAMPUS, getSingleCampus };
