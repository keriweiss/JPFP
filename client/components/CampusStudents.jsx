import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../redux/actions/updateStudent';
import { Hashrouter as Router, Link, Route, Switch } from 'react-router-dom';

const CampusStudents = (props) => {
  const students = props.students || [];
  return students.length ? (
    <div id='campusStudents'>
      {students
        .sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        })
        .map((student) => (
          <>
            <Link to={`/students/${student.id}`} key={student.id}>
              <ul key={`student${student.id}`}>
                {student.firstName} {student.lastName}
              </ul>
            </Link>
            <button
              onClick={() => {
                props.updateStudent({ id: student.id, campusId: null });
              }}
            >
              Remove Student From Campus
            </button>
          </>
        ))}
    </div>
  ) : (
    <p id='campusClosed'>
      Campus has been condemned and is currently unsafe. Campus will reopen in
      2030.
    </p>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.campus.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student) => {
      dispatch(updateStudent(student));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusStudents);
