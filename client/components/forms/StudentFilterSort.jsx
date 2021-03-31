import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterSortStudent } from '../../redux/actions/filterSortStudent';

const StudentFilterSort = (props) => {
  const [basis, setBasis] = useState('');

  //filters and sorts students, and search for student/(s). Feature: filter sorted students and sort filtered students.
  useEffect(() => {
    if (basis === 'registered')
      props.setStudentPool(
        props.students.filter((student) => student.campusId)
      );
    if (basis === 'unregistered')
      props.setStudentPool(
        props.students.filter((student) => student.campusId === null)
      );
    if (basis === 'all') props.setStudentPool(props.students);
    if (basis === 'lastName') {
      console.log('sort');
      props.setStudentPool(
        props.studentPool
          .slice()
          .sort((a, b) =>
            a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1
          )
      );
    }
    if (basis === 'firstName')
      props.setStudentPool(
        props.studentPool
          .slice()
          .sort((a, b) =>
            a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1
          )
      );
    if (basis === 'gpa ascending') {
      props.setStudentPool(
        props.studentPool.slice().sort((a, b) => (a.gpa < b.gpa ? -1 : 1))
      );
      props.setStudentPool(
        props.studentPool.slice().sort((a, b) => (a.gpa < b.gpa ? -1 : 1))
      );
    }
    if (basis === 'gpa descending')
      props.setStudentPool(
        props.studentPool.slice().sort((a, b) => (a.gpa > b.gpa ? -1 : 1))
      );
    if (basis.includes('search')) {
      const student = props.students.filter((student) => {
        const name = `${student.firstName} ${student.lastName}`;
        return name.toLowerCase().includes(basis.slice(7).toLowerCase());
      });
      props.setStudentPool(student);
    }
  }, [basis]);

  return (
    <div id='allStudentsSelect'>
      <div id='search'>
        <label
          id='searchSubmit'
          // onClick={(e) => {
          //   setBasis('search:' + e.target.value);
          //   console.log(e.target.value);
          // }}
        >
          SEARCH |
          <input
            type='text'
            name='search'
            defaultValue=''
            onChange={(e) => setBasis('search:' + e.target.value)}
          />
        </label>
      </div>
      <div id='filter'>
        <label id='filterSubmit'>
          FILTER |
          <select
            id='studentFilter'
            onChange={(e) => {
              setBasis(e.target.value);
              location = '#/students?page=1';
            }}
          >
            <option value='all'>All</option>
            <option value='registered'>Registered Students</option>
            <option value='unregistered'>Unregistered Students</option>
          </select>
        </label>
      </div>
      <div id='sort'>
        <label id='sortSubmit'>
          SORT |
          <select
            id='studentSort'
            onChange={(e) => {
              props.filterSortStudent(e.target.value, props.students);
              setBasis(e.target.value);
              location = '#/students?page=1';
            }}
          >
            <option>Sort By</option>
            <option value='firstName'>First Name</option>
            <option value='lastName'>Last Name</option>
            <option value='gpa ascending'>GPA (ascending)</option>
            <option value='gpa descending'>GPA (descending)</option>
          </select>
        </label>
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
