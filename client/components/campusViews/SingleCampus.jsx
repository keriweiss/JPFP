import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Hashrouter as Router, Link, Route, Switch } from 'react-router-dom';
import CampusUpdate from '../forms/CampusUpdate';
import { getSingleCampus } from '../../redux/actions/getSingleCampus';
import { updateStudent } from '../../redux/actions/updateStudent';
import CampusStudents from './CampusStudents';

const Campus = (props) => {
  const [students, showStudents] = useState(false);

  useEffect(() => {
    props.getSingleCampus(props.match.params.id);
  }, []);

  const { name, imageUrl, address, description } = props.campus;

  return (
    <div id='singleCampusContainer'>
      <div className='singleCampusView'>
        <img src={imageUrl} />
        <h2>{name}</h2>
        <p>{address}</p>
        <p>{description}</p>
        <CampusUpdate />
        <button onClick={() => showStudents(!students)}>
          Click for students enrolled at this campus
        </button>
        {students ? <CampusStudents /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    campus: state.campus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleCampus: (campusId) => dispatch(getSingleCampus(campusId)),
    updateStudent: (student) => {
      dispatch(updateStudent(student));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
