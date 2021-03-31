import axios from 'axios';

const FILTER_SORT_STUDENTS = 'FILTER_SORT_STUDENTS';

const filterSortStudent = (basis, students) => {
  return async (dispatch) => {
    try {
      if (basis === 'lastName')
        students = students.sort((a, b) => (a.lastName < b.lastName ? -1 : 1));
      if (basis === 'firstName')
        students = students.sort((a, b) =>
          a.firstName < b.firstName ? -1 : 1
        );
      if (basis === 'gpa ascending')
        students = students.sort((a, b) => (a.gpa < b.gpa ? -1 : 1));
      if (basis === 'gpa descending')
        students = students.sort((a, b) => (b.gpa < a.gpa ? -1 : 1));
      dispatch(_filterSortStudent(students));
    } catch (err) {
      console.error(err);
    }
  };
};

const _filterSortStudent = (students) => ({
  type: FILTER_SORT_STUDENTS,
  students,
});

export { FILTER_SORT_STUDENTS, filterSortStudent };
