import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';

const getCampuses = () => {
  return async (dispatch) => {
    try {
      const getCampuses = async (pageNo = 1) => {
        const results = (await axios.get(`/api/campuses?page=${pageNo}`)).data;
        if (results.length) {
          return results.concat(await getCampuses(pageNo + 1));
        } else {
          return results;
        }
      };
      const campuses = await getCampuses();
      dispatch(_getCampuses(campuses));
    } catch (err) {
      console.error(err);
    }
  };
};

const _getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses,
  };
};

export { getCampuses, GET_CAMPUSES };
