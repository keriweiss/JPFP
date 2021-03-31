import axios from 'axios';

const UPDATE_STUDENT = 'UPDATE_STUDENT';

const updateStudent = (student) => {
  return async (dispatch) => {
    try {
      const studentToUpdate = (
        await axios.put(`/api/students/${student.id}`, student)
      ).data;
      dispatch(_updateStudent(studentToUpdate));
    } catch (err) {
      console.error(err);
    }
  };
};

const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export { UPDATE_STUDENT, updateStudent };
