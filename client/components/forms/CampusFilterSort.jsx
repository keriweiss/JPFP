import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemsPerPage from './ItemsPerPage';

const CampusFilterSort = (props) => {
  const [basis, setBasis] = useState('');

  const viewOptions = [
    [9, 9],
    [45, 45],
    [90, 90],
    ['All', props.campuses.length],
  ];

  useEffect(() => {
    if (basis === 'active')
      props.setCampusPool(
        props.campuses.filter((campus) => campus.students.length)
      );
    if (basis === 'idle')
      props.setCampusPool(
        props.campuses.filter((campus) => !campus.students.length)
      );
    if (basis === 'all') props.setCampusPool(props.campuses);
    if (basis === 'ascending') {
      props.setCampusPool(
        props.campusPool
          .slice()
          .sort((a, b) => a.students.length - b.students.length)
      );
    }
    if (basis === 'descending')
      props.setCampusPool(
        props.campusPool
          .slice()
          .sort((a, b) => b.students.length - a.students.length)
      );
  }, [basis]);
  return (
    <div id='allCampusSelect'>
      <div id='viewNum'>
        <ItemsPerPage
          pool={props.campusPool}
          setItemsPerPage={props.setCampusesPerPage}
          items={props.campuses}
          itemsPerPage={props.campusesPerPage}
          item='campuses'
          viewOptions={viewOptions}
          setCurrentPage={props.setCurrentPage}
        />
      </div>
      <div id='filter'>
        FILTER
        <select
          id='campusFilter'
          onChange={(e) => {
            setBasis(e.target.value);
            location = '#/campuses?page=1';
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
            location = '#/campuses?page=1';
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
