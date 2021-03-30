import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Route, Link, Switch, Router } from 'react-router-dom';
import { getSingleStudent } from '../redux/actions/getSingleStudent';
import StudentUpdate from './forms/StudentUpdate';

const SingleStudent = (props) => {
  useEffect(() => {
    props.getSingleStudent(props.match.params.id);
  }, []);
  const { firstName, lastName, imageUrl, email, gpa } = props.student;
  const campus = props.student.campus || {};
  return (
    <div id='singleStudentContainer'>
      <div id='singleStudent'>
        <h2>
          {firstName} {lastName}
        </h2>
        <img src={imageUrl} />
        <div className='studentInfo'>
          <p>
            <div className='label'>Email Address</div>
            {email}
          </p>
          <p>
            <div className='label'>GPA</div>
            {gpa}
          </p>
          {campus.id ? (
            <p>
              <div className='label'>Campus</div>
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
            </p>
          ) : (
            <p>Student is currently on leave.</p>
          )}
        </div>
      </div>
      <StudentUpdate />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleStudent: (studentId) => dispatch(getSingleStudent(studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
