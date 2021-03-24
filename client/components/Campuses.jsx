import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CampusCreate from './forms/CampusCreate';
import { deleteCampus } from '.././redux/actions/deleteCampus';

const Campuses = (props) => {
  return (
    <div>
      <h2>CAMPUSES</h2>
      <div id='campusesPageContainer'>
        <div id='campusesContainer'>
          {props.campuses.map((campus) => (
            <div className='campus' key={campus.id}>
              <Link to={`campuses/${campus.id}`}>
                <p id='campusTitle'>{campus.name}</p>
                <div className='campusImgContainer'>
                  <img src={campus.imageUrl} width='450'></img>
                </div>
              </Link>
              <button
                type='button'
                className='deleteCampus'
                onClick={() => {
                  props.deleteCampus(campus.id);
                }}
              >
                Remove Campus
              </button>
            </div>
          ))}
        </div>
        <CampusCreate />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  campuses: state.campuses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCampus: (campusId) => dispatch(deleteCampus(campusId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
