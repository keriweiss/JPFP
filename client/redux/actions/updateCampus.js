import axios from 'axios';

const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const updateCampus = (campusToUpdate) => {
  return async (dispatch) => {
    try {
      const campus = (
        await axios.put(`/api/campuses/${campusToUpdate.id}`, campusToUpdate)
      ).data;
      dispatch(_updateCampus(campus));
    } catch (err) {
      console.error(err);
    }
  };
};

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus,
  };
};

export { UPDATE_CAMPUS, updateCampus };
