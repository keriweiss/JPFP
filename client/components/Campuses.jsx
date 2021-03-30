import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CampusCreate from './forms/CampusCreate';
import { deleteCampus } from '.././redux/actions/deleteCampus';
import CampusFilterSort from './forms/CampusFilterSort';
import Pagination from './Pagination';

const Campuses = (props) => {
  const [displayedCampuses, setDisplayedCampuses] = useState([]);
  const [campusAdded, isCampusAdded] = useState(false);

  const initialRender = useRef(1);

  useEffect(() => {
    if (props.campuses.length && initialRender.current === 1) {
      initialRender.current += 1;
      setDisplayedCampuses(props.campuses);
    }
    if (campusAdded) {
      setDisplayedCampuses(props.campuses);
      isCampusAdded(false);
    }
  }, [props]);

  return (
    <div>
      <h2>CAMPUSES</h2>
      <CampusFilterSort setDisplayedCampuses={setDisplayedCampuses} />
      <div id='campusesPageContainer'>
        <div id='campusesContainer'>
          {displayedCampuses.map((campus) => (
            <div className='campus' key={campus.id}>
              <Link to={`campuses/${campus.id}`}>
                <p id='campusTitle'>
                  {campus.name} - (Students Enrolled: {campus.students.length})
                </p>
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
        <CampusCreate isCampusAdded={isCampusAdded} />
      </div>
      {/* <Pagination /> */}
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
