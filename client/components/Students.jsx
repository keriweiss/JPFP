import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import StudentCreate from './forms/StudentCreate';

const Students = (props) => {
  return (
    <div id='studentContainer'>
      <h2>STUDENTS:</h2>
      <div id='students'>
        {props.students.map((student) => (
          <div className='student' key={student.id}>
            <Link to={`/students/${student.id}`}>
              <div id='studentOverlay'>+</div>
              <p>
                {student.firstName} {student.lastName}
              </p>
              <img src={student.imageUrl}></img>
            </Link>
          </div>
        ))}
        <StudentCreate />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps)(Students);
