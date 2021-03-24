import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../../redux/actions/createStudent';

const StudentCreate = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gpa, setGpa] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = !initialRender.current;
    } else {
      props.createStudent({
        firstName: firstName,
        lastName: lastName,
        email: email,
        gpa: gpa * 1,
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setGpa('');
    }
  }, [isClicked]);
  return (
    <div>
      <form id='studentCreate'>
        <label>First Name:</label>
        <input
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email Address:</label>
        <input
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>GPA (leave blank for new student):</label>
        <input
          name='gpa'
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <button
          type='button'
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent: (student) => {
      dispatch(createStudent(student));
    },
  };
};

export default connect(null, mapDispatchToProps)(StudentCreate);
