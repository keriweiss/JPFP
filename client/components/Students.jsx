import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { deleteStudent } from '../redux/actions/deleteStudent';
import StudentCreate from './forms/StudentCreate';
import StudentFilterSort from './forms/StudentFilterSort';
import Pagination from './Pagination';

const Students = (props) => {
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [studentAdded, isStudentAdded] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [studentPool, setStudentPool] = useState([]);

  console.log('currentpage', currentPage);

  const initialRender = useRef(1);

  useEffect(() => {
    if (props.students.length && initialRender.current === 1) {
      const currentStudents = props.students.slice(
        (currentPage - 1) * 10,
        currentPage * 10
      );
      initialRender.current += 1;
      setDisplayedStudents(currentStudents);
    }
    if (studentAdded === true) {
      setDisplayedStudents(props.students);
      setCurrentPage(0);
      isStudentAdded(false);
    }
    if (currentPage === 0) setCurrentPage(1);
  }, [props]);

  useEffect(() => {
    if (currentPage === 0) setCurrentPage(1);
    if (props.students.length && initialRender.current !== 1) {
      const currentStudents = props.students.slice(
        (currentPage - 1) * 10,
        currentPage * 10
      );
      initialRender.current += 1;
      setDisplayedStudents(currentStudents);
    }
  }, [currentPage]);

  //get cur students
  //students.slice((page-1) * 10, page * 10)

  return (
    <div id='studentContainer'>
      <h2>STUDENTS</h2>
      <StudentCreate isStudentAdded={isStudentAdded} />
      <StudentFilterSort
        setDisplayedStudents={setDisplayedStudents}
        displayedStudents={displayedStudents}
        setCurrentPage={setCurrentPage}
        setStudentPool={setStudentPool}
      />
      <div id='students'>
        {displayedStudents.map((student) => (
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
      <Pagination
        studentsPerPage={studentsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
