import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Route, Link, Switch, Router } from 'react-router-dom';
import { getSingleStudent } from '../redux/actions/getSingleStudent';

const SingleStudent = (props) => {
  useEffect(() => {
    props.getSingleStudent(props.match.params.id);
  }, []);
  const { firstName, lastName, imageUrl, email, gpa } = props.student;
  const campus = props.student.campus || {};
  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <img src={imageUrl} />
      <p>Email Address: {email}</p>
      <p>GPA: {gpa}</p>
      {campus.id ? (
        <p>
          Campus:{`\n`}
          <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
        </p>
      ) : (
        <p>Student is currently on leave.</p>
      )}
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
