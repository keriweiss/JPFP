import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const getStudents = () => {
  return async (dispatch) => {
    const getStudents = async (pageNo = 1) => {
      const results = (await axios.get(`/api/students?page=${pageNo}`)).data;
      const studentsLength = results.length;
      if (results.students.length) {
        return results.students.concat(await getStudents(pageNo + 1));
      } else {
        return results.students;
      }
    };
    const students = await getStudents();
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
