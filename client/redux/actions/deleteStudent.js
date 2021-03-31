import axios from 'axios';

const DELETE_STUDENT = 'DELETE_STUDENT';

const deleteStudent = (studentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      dispatch(_deleteStudent(studentId));
    } catch (err) {
      console.error(err);
    }
  };
};

const _deleteStudent = (studentId) => {
  return {
    type: DELETE_STUDENT,
    studentId,
  };
};

export { DELETE_STUDENT, deleteStudent };
