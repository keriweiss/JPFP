import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { deleteStudent } from '../redux/actions/deleteStudent';
import StudentCreate from './forms/StudentCreate';

const Students = (props) => {
  return (
    <div id='studentContainer'>
      <h2>STUDENTS:</h2>
      <StudentCreate />
      <div id='students'>
        {props.students.map((student) => (
          <div className='studentWithButton' key={student.id}>
            <div className='student'>
              <Link to={`/students/${student.id}`}>
                <div id='studentOverlay'>+</div>
                <p>
                  {student.firstName} {student.lastName}
                </p>
                <img src={student.imageUrl}></img>
              </Link>
            </div>
            <button
              type='button'
              onClick={() => {
                props.deleteStudent(student.id);
              }}
            >
              Remove Student
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
