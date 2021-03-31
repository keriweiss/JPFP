import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { deleteStudent } from '../redux/actions/deleteStudent';
import StudentCreate from './forms/StudentCreate';
import StudentFilterSort from './forms/StudentFilterSort';
import Pagination from './Pagination';

const Students = (props) => {
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [studentChanged, isStudentChanged] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [studentPool, setStudentPool] = useState([]);

  const initialRender = useRef(1);

  //handles URL queries
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    let pageNum = parseInt(params.get('page'));
    pageNum > Math.ceil(props.students.length / studentsPerPage)
      ? (location = '#/students?page=1')
      : setCurrentPage(props.location.search ? pageNum : 1);
  }, [props.location.search]);

  //handles changes is props.students
  useEffect(() => {
    if (props.students.length && initialRender.current === 1) {
      setStudentPool(props.students);
      initialRender.current += 1;
      setDisplayedStudents(
        studentPool.slice((currentPage - 1) * 10, currentPage * 10)
      );
    }
    if (studentChanged === true) {
      setStudentPool(props.students);
      setDisplayedStudents(
        studentPool.slice((currentPage - 1) * 10, currentPage * 10)
      );
      setCurrentPage(0);
      isStudentChanged(false);
    }
    if (currentPage === 0) setCurrentPage(1);
  }, [props.students]);

  //handles changes to current page
  useEffect(() => {
    if (currentPage === 0) setCurrentPage(1);
    if (props.students.length && initialRender.current !== 1) {
      setDisplayedStudents(
        studentPool.slice((currentPage - 1) * 10, currentPage * 10)
      );
    }
  }, [currentPage]);

  //handles changes to student pool (filtering and sorting change the pool)
  useEffect(() => {
    setDisplayedStudents(
      studentPool.slice((currentPage - 1) * 10, currentPage * 10)
    );
  }, [studentPool]);

  return (
    <div id='studentContainer'>
      <h2>STUDENTS</h2>
      <StudentCreate isStudentChanged={isStudentChanged} />
      <StudentFilterSort
        setCurrentPage={setCurrentPage}
        setStudentPool={setStudentPool}
        studentPool={studentPool}
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
                console.log('id', student.id);
                props.deleteStudent(student.id);
                isStudentChanged(true);
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
        studentPool={studentPool}
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
