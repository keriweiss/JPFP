import axios from 'axios';

const CREATE_STUDENT = 'CREATE_STUDENT';

const createStudent = (student) => {
  return async (dispatch) => {
    const createdStudent = (await axios.post('/api/students', student)).data;
    dispatch(_createStudent(createdStudent));
  };
};

const _createStudent = (createdStudent) => {
  return {
    type: CREATE_STUDENT,
    createdStudent,
  };
};

export { createStudent, CREATE_STUDENT };
