import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const getStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_getStudents(students));
  };
};

const _getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students,
  };
};

export { getStudents, GET_STUDENTS };
