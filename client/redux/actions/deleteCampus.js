import axios from 'axios';

const DELETE_CAMPUS = 'DELETE_CAMPUS';

const deleteCampus = (campusId) => {
  console.log(campusId);
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(_deleteCampus(campusId));
  };
};

const _deleteCampus = (campusId) => {
  return {
    type: DELETE_CAMPUS,
    campusId,
  };
};

export { deleteCampus, DELETE_CAMPUS };
