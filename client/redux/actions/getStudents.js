import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const getStudents = () => {
  return async (dispatch) => {
    try {
      const getStudents = async (pageNo = 1) => {
        const results = (await axios.get(`/api/students?page=${pageNo}`)).data;
        const studentsLength = results.length;
        if (results.students.length) {
          /*your backend is set up to send either all students, or just a certain number of students depending on whether a certain page is being queried. i would take advantage of that and have two separate functions and actions for getting student data. one for getting all students and another for getting a specific page of students.  */
          return results.students.concat(await getStudents(pageNo + 1));
        } else {
          return results.students;
        }
      };
      const students = await getStudents();
      dispatch(_getStudents(students));
    } catch (err) {
      console.error(err);
    }
  };
};

const _getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students,
  };
};

export { getStudents, GET_STUDENTS };
