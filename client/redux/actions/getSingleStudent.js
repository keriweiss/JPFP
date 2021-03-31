import axios from 'axios';

const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

const getSingleStudent = (studentId) => {
  return async (dispatch) => {
    try {
      const student = (await axios.get(`/api/students/${studentId}`)).data;
      dispatch(_getSingleStudent(student));
    } catch (err) {
      console.error(err);
    }
  };
};

const _getSingleStudent = (student) => {
  return {
    type: GET_SINGLE_STUDENT,
    student,
  };
};

export { getSingleStudent, GET_SINGLE_STUDENT };
