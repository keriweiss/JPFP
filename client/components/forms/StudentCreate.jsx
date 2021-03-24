import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../../redux/actions/createStudent';

const StudentCreate = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gpa, setGpa] = useState('');
  const [campusId, setcampusId] = useState(null);
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
        campusId: campusId * 1,
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setGpa('');
      setcampusId('Select Campus');
    }
  }, [isClicked]);
  return (
    <form id='studentCreate'>
      <div>
        <label>First Name:</label>
        <input
          name='firstName'
          value={firstName}
          size='15'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email Address:</label>
        <input
          name='email'
          value={email}
          size='40'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>GPA (leave blank for new student):</label>
        <input
          name='gpa'
          value={gpa}
          size='3'
          maxLength='3'
          onChange={(e) => setGpa(e.target.value)}
        />
      </div>
      <div>
        <label>Campus: </label>
        <select
          onChange={(e) => {
            setcampusId(e.target.value);
          }}
        >
          <option value={null}>Select Campus</option>
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
          setIsClicked(!isClicked);
        }}
      >
        Add Student
      </button>
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
