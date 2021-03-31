import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Route, Link, Switch, Router } from 'react-router-dom';
import { getSingleStudent } from '../redux/actions/getSingleStudent';
import StudentUpdate from './forms/StudentUpdate';
import PageNotFound from './PageNotFound';

const SingleStudent = (props) => {
  useEffect(() => {
    props.getSingleStudent(props.match.params.id);
  }, []);
  console.log('props', props);
  const { firstName, lastName, imageUrl, email, gpa } = props.student;
  const campus = props.student.campus || {};
  return campus.id ? (
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
  ) : (
    <PageNotFound />
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
