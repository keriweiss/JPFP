import axios from 'axios';

const DELETE_STUDENT = 'DELETE_STUDENT';

const deleteStudent = (studentId) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(_deleteStudent(studentId));
  };
};

const _deleteStudent = (studentId) => {
  return {
    type: DELETE_STUDENT,
    studentId,
  };
};

export { DELETE_STUDENT, deleteStudent };
