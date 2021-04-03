import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CampusCreate from '../forms/CampusCreate';
import { deleteCampus } from '../../redux/actions/deleteCampus';
import CampusFilterSort from '../forms/CampusFilterSort';
import Pagination from '../Pagination';

const Campuses = (props) => {
  const [displayedCampuses, setDisplayedCampuses] = useState([]);
  const [campusChange, isCampusChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [campusesPerPage, setCampusesPerPage] = useState(9);
  const [campusPool, setCampusPool] = useState([]);

  const initialRender = useRef(1);

  const slicePool = campusPool.slice(
    (currentPage - 1) * campusesPerPage,
    currentPage * campusesPerPage
  );

  //handles URL queries
  if (props.hasOwnProperty('location')) {
    useEffect(() => {
      const params = new URLSearchParams(props.location.search);
      let pageNum = parseInt(params.get('page'));
      pageNum > Math.ceil(props.campuses.length / campusesPerPage)
        ? (location = '#/campuses?page=1')
        : setCurrentPage(props.location.search ? pageNum : 1);
    }, [props.location.search]);
  }

  //handles changes in props.campuses
  useEffect(() => {
    if (props.campuses.length && initialRender.current === 1) {
      setCampusPool(props.campuses);
      initialRender.current += 1;
      setDisplayedCampuses(slicePool);
    }
    if (campusChange) {
      console.log('test campusAadded');
      setCampusPool(props.campuses);
      setDisplayedCampuses(slicePool);
      location = '#/campuses?page=1';
      isCampusChange(false);
    }
    if (currentPage === 0) setCurrentPage(1);
  }, [props.campuses]);

  //handles changes to current page
  useEffect(() => {
    if (currentPage === 0) setCurrentPage(1);
    if (props.campuses.length && initialRender.current !== 1) {
      setDisplayedCampuses(slicePool);
    }
  }, [currentPage]);

  //handles changes to campus pool (filtering and sorting change the pool)
  useEffect(() => {
    setDisplayedCampuses(slicePool);
  }, [campusPool, campusesPerPage]);

  return (
    <div id='campusesWrapper'>
      <h2>CAMPUSES</h2>
      <CampusCreate isCampusAdded={isCampusChange} />
      <CampusFilterSort
        setCampusPool={setCampusPool}
        campusPool={campusPool}
        campusesPerPage={campusesPerPage}
        setCampusesPerPage={setCampusesPerPage}
        setCurrentPage={setCurrentPage}
      />
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
                  isCampusChange(true);
                }}
              >
                Remove Campus
              </button>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        instancesPerPage={campusesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pool={campusPool}
        location='campuses?page'
        itemsPerPage={campusesPerPage}
      />
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
