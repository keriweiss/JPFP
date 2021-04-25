import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';

const getCampuses = () => {
  return async (dispatch) => {
    try {
      const getCampuses = async (pageNo = 1) => {
        const results = (await axios.get(`/api/campuses?page=${pageNo}`)).data;
        /*this is an interesting approach to getting data with a paginated back end. it isnt super efficient to have a paginated backend if on the front end you're still recursively getting all of the data from all of the campuses (or students) when your app loads.

        the best practice is typically something called "lazy loading", which means you're only getting the data when you need to. so instead of getting all the data from the outset, you would get the first page of data and only get the second page of data once the user requests it.*/
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
