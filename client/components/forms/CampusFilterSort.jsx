import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const CampusFilterSort = (props) => {
  const [basis, setBasis] = useState('');

  useEffect(() => {
    if (basis === 'active')
      props.setDisplayedCampuses(
        props.campuses.filter((campus) => campus.students.length)
      );
    if (basis === 'idle')
      props.setDisplayedCampuses(
        props.campuses.filter((campus) => !campus.students.length)
      );
    if (basis === 'all') props.setDisplayedCampuses(props.campuses);
    if (basis === 'ascending') {
      console.log(props.campuses);
      props.setDisplayedCampuses(
        props.campuses
          .slice()
          .sort((a, b) => a.students.length - b.students.length)
      );
    }
    if (basis === 'descending')
      props.setDisplayedCampuses(
        props.campuses
          .slice()
          .sort((a, b) => b.students.length - a.students.length)
      );
  });
  return (
    <div id='allCampusSelect'>
      <div id='filter'>
        FILTER
        <select
          id='campusFilter'
          onChange={(e) => {
            setBasis(e.target.value);
          }}
        >
          <option value='all'>All Campuses</option>
          <option value='active'>Active Campuses</option>
          <option value='idle'>Idle Campuses</option>
        </select>
      </div>
      <div id='sort'>
        SORT
        <select
          id='campusFilter'
          onChange={(e) => {
            setBasis(e.target.value);
          }}
        >
          <option>Sort By</option>
          <option value='ascending'>Number Of Students (ascending)</option>
          <option value='descending'>Number Of Students (descending)</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  campuses: state.campuses,
});

export default connect(mapStateToProps, null)(CampusFilterSort);
