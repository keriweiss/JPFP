import axios from 'axios';

const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';

const getSingleCampus = (campusId) => {
  return async (dispatch) => {
    const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
    dispatch(_getSingleCampus(campus));
  };
};

const _getSingleCampus = (campus) => {
  return {
    type: GET_SINGLE_CAMPUS,
    campus,
  };
};

export { GET_SINGLE_CAMPUS, getSingleCampus };
