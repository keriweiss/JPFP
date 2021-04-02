import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Pagination = ({
  instancesPerPage, //Number of students/campuses on each page
  setCurrentPage, //Set which page is displayed
  currentPage, //Page displayed
  pool, //Students/campuses for display to pull from - dependent on filter and sort
  location,
  itemsPerPage,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [startIdx, setStartIdx] = useState(1);
  const [endIdx, setEndIdx] = useState(5);

  //Set total number of pages
  useEffect(() => {
    setTotalPages(Math.ceil(pool.length / instancesPerPage));
  }, [pool, itemsPerPage]);

  //set start index for which pages are displayed, so we don't see all page number
  useEffect(() => {
    currentPage < 3 ? setStartIdx(0) : setStartIdx(currentPage - 3);
  }, [currentPage]);

  //Aray of page numbers
  const pages = Array.from(Array(totalPages).keys());

  return (
    <div id='pages'>
      <Link
        to={`${location}=${currentPage - 1}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <span className='page pointer'>{'<'}</span>
      </Link>
      {pages.slice(startIdx, startIdx + 5).map((page) => (
        <Link
          key={page}
          to={`${location}=${page + 1}`}
          onClick={() => setCurrentPage(page + 1)}
        >
          <span
            className={currentPage === page + 1 ? 'page currentPage' : 'page'}
          >
            {page + 1}
          </span>
        </Link>
      ))}
      {currentPage < pages.length - 2 ? (
        <span>
          ...
          <Link to={`${location}=${pages.length}`}>
            <span className='page'>{pages.length}</span>
          </Link>
        </span>
      ) : null}
      <Link
        to={`${location}=${currentPage + 1}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <span className='page pointer'>{'>'}</span>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, null)(Pagination);
