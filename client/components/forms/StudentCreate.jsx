import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../../redux/actions/createStudent';

const StudentCreate = (props) => {
  const defaultNewStudent = {
    firstName: '',
    lastName: '',
    campusId: '',
    email: '',
    gpa: '',
  };

  const [newStudent, setNewStudent] = useState(defaultNewStudent);
  const [isClicked, setIsClicked] = useState(false);
  const [required, setRequired] = useState(true);

  const initialRender = useRef(true);
  const isEnabled =
    newStudent.firstName && newStudent.lastName && newStudent.email;

  useEffect(() => {
    console.log(isEnabled);
    if (initialRender.current) {
      initialRender.current = false;
    } else if (isEnabled) {
      if (newStudent.gpa === '') newStudent.gpa = null;
      if (newStudent.campusId === '') newStudent.campusId = null;
      props.createStudent(newStudent);
      setNewStudent(defaultNewStudent);
      props.isStudentChanged(true);
    }
  }, [isClicked]);

  return (
    <form id='studentCreate'>
      <div>
        <input
          placeholder='FIRST NAME'
          name='firstName'
          value={newStudent.firstName}
          onChange={(e) =>
            setNewStudent({ ...newStudent, firstName: e.target.value })
          }
        />
        <input
          placeholder='LAST NAME'
          name='lastName'
          value={newStudent.lastName}
          onChange={(e) =>
            setNewStudent({ ...newStudent, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <input
          placeholder='EMAIL'
          name='email'
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />
      </div>
      <div>
        <input
          placeholder='GPA'
          name='gpa'
          type='number'
          step='.1'
          value={newStudent.gpa}
          maxLength='3'
          onChange={(e) =>
            setNewStudent({ ...newStudent, gpa: e.target.value * 1 })
          }
        />

        <select
          value={newStudent.campusId}
          onChange={(e) =>
            setNewStudent({ ...newStudent, campusId: e.target.value * 1 })
          }
        >
          <option value='selectCampus'>Select Campus</option>
          {props.campuses.map((campus) => (
            <option value={`${campus.id}`} key={`campus${campus.id}`}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type='button'
        onClick={() => {
          !isEnabled ? setRequired(false) : setRequired(true);
          setIsClicked(!isClicked);
        }}
      >
        Add Student
      </button>
      {!required ? (
        <div id='studentCreateRequired'>
          Please fill out all required fields (first name, last name, and
          email).
        </div>
      ) : null}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { campuses: state.campuses };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent: (student) => {
      dispatch(createStudent(student));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
