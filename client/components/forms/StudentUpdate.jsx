import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../../redux/actions/updateStudent';

const StudentUpdate = (props) => {
  const { student } = props;
  const [studentToUpdate, setStudentToUpdate] = useState({});
  const [inputValues, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gpa: '',
    campusId: 'Select Campus',
  });
  const [isClicked, setIsClicked] = useState('false');

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      props.updateStudent(studentToUpdate);
      setValue({
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
        campusId: 'Select Campus',
      });
    }
  }, [isClicked]);

  return (
    <form id='studentUpdate'>
      <div id='studentNameUpdate'>
        <label>First Name: </label>
        <input
          name='firstName'
          value={inputValues.firstName}
          placeholder={student.firstName}
          size='15'
          onChange={(e) => {
            setValue({ ...inputValues, firstName: e.target.value });
            setStudentToUpdate({
              ...studentToUpdate,
              firstName: e.target.value,
            });
          }}
        />
        <label>Last Name: </label>
        <input
          name='lastName'
          value={inputValues.lastName}
          placeholder={student.lastName}
          onChange={(e) => {
            setValue({ ...inputValues, lastName: e.target.value });
            setStudentToUpdate({
              ...studentToUpdate,
              lastName: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <label>Email Address:</label>
        <input
          name='email'
          value={inputValues.email}
          placeholder={student.email}
          size='35'
          onChange={(e) => {
            setValue({ ...inputValues, email: e.target.value });
            setStudentToUpdate({ ...studentToUpdate, email: e.target.value });
          }}
        />
      </div>
      <div id='studentGpaCampusUpdate'>
        <label>GPA:</label>
        <input
          name='gpa'
          value={inputValues.gpa}
          placeholder={student.gpa}
          size='3'
          onChange={(e) => {
            setValue({ ...inputValues, gpa: e.target.value });
            setStudentToUpdate({ ...studentToUpdate, gpa: e.target.value * 1 });
          }}
        />
        <label>Campus: </label>
        <select
          value={inputValues.campusId}
          onChange={(e) => {
            const campus = props.campuses.find(
              (campus) => campus.id === e.target.value * 1
            );
            setValue({
              ...inputValues,
              campusId: e.target.value,
            });
            setStudentToUpdate({
              ...studentToUpdate,
              campusId: e.target.value * 1,
              campus: campus,
            });
          }}
        >
          <option value='Select Campus'>Select Campus</option>
          {props.campuses.map((campus) => (
            <option value={campus.id} key={`campus${campus.id}`}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type='button'
        onClick={() => {
          setIsClicked(!isClicked);
          setStudentToUpdate({ ...studentToUpdate, id: student.id });
        }}
      >
        Update User
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
  campuses: state.campuses,
});

const mapDispatchToProps = (dispatch) => ({
  updateStudent: (student) => {
    dispatch(updateStudent(student));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentUpdate);
