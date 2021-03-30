import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterSortStudent } from '../../redux/actions/filterSortStudent';

const StudentFilterSort = (props) => {
  const [basis, setBasis] = useState('');

  useEffect(() => {
    if (basis === 'registered')
      props.setDisplayedStudents(
        props.students.filter((student) => student.campusId)
      );
    if (basis === 'unregistered')
      props.setDisplayedStudents(
        props.students.filter((student) => student.campusId === null)
      );
    if (basis === 'all') props.setDisplayedStudents(props.students);
    if (basis === 'lastName')
      props.setDisplayedStudents(
        props.displayedStudents
          .slice()
          .sort((a, b) => (a.lastName < b.lastName ? -1 : 1))
      );
    if (basis === 'firstName')
      props.setDisplayedStudents(
        props.displayedStudents
          .slice()
          .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
      );
    if (basis === 'gpa ascending') {
      props.setDisplayedStudents(
        props.displayedStudents.slice().sort((a, b) => (a.gpa < b.gpa ? -1 : 1))
      );
      props.setDisplayedStudents(
        props.displayedStudents.slice().sort((a, b) => (a.gpa < b.gpa ? -1 : 1))
      );
    }
    if (basis === 'gpa descending')
      props.setDisplayedStudents(
        props.displayedStudents.slice().sort((a, b) => (a.gpa > b.gpa ? -1 : 1))
      );
  }, [basis]);

  return (
    <div id='allStudentsSelect'>
      <div id='filter'>
        FILTER |
        <select
          id='studentFilter'
          onChange={(e) => {
            setBasis(e.target.value);
            // props.setCurrentPage(0);
            // location = '#/students?page=1';
          }}
        >
          <option value='all'>All</option>
          <option value='registered'>Registered Students</option>
          <option value='unregistered'>Unregistered Students</option>
        </select>
      </div>
      <div id='sort'>
        SORT |
        <select
          id='studentSort'
          onChange={(e) => {
            props.filterSortStudent(e.target.value, props.students);
            setBasis(e.target.value);
            props.setCurrentPage(0);
            location = '#/students?page=1';
          }}
        >
          <option>Sort By</option>
          <option value='firstName'>First Name</option>
          <option value='lastName'>Last Name</option>
          <option value='gpa ascending'>GPA (ascending)</option>
          <option value='gpa descending'>GPA (descending)</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

const mapDispatchToProps = (dispatch) => ({
  filterSortStudent: (basis, students) =>
    dispatch(filterSortStudent(basis, students)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentFilterSort);
