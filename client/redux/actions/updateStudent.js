import axios from 'axios';

const UPDATE_STUDENT = 'UPDATE_STUDENT';

const updateStudent = (student) => {
  return async (dispatch) => {
    const studentToUpdate = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(_updateStudent(studentToUpdate));
  };
};

const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export { UPDATE_STUDENT, updateStudent };
