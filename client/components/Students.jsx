import React from 'react';
import { connect } from 'react-redux';

const Students = (props) => {
  console.log(props.students);
  return (
    <div>
      Students:
      {props.students.map((student) => (
        <div id='student' key={student.id}>
          <p>
            {student.firstName} {student.lastName}
          </p>
          <img src={student.imageUrl}></img>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps)(Students);
