import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Pagination = ({
  studentsPerPage,
  setCurrentPage,
  currentPage,
  studentPool,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [startIdx, setStartIdx] = useState(1);
  const [endIdx, setEndIdx] = useState(5);

  useEffect(() => {
    setTotalPages(Math.ceil(studentPool.length / studentsPerPage));
  }, [studentPool]);

  useEffect(() => {
    currentPage < 3 ? setStartIdx(0) : setStartIdx(currentPage - 3);
  }, [currentPage]);

  const pages = Array.from(Array(totalPages).keys());

  return (
    <div id='pages'>
      <Link
        to={`students?page=${currentPage - 1}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <span className='page pointer'>{'<'}</span>
      </Link>
      {pages.slice(startIdx, currentPage + 2).map((page) => (
        <Link
          to={`students?page=${page + 1}`}
          onClick={() => setCurrentPage(page + 1)}
        >
          <span
            className={currentPage === page + 1 ? 'page currentPage' : 'page'}
          >
            {page + 1}
          </span>
        </Link>
      ))}
      {currentPage !== pages.length ? (
        <span>
          ...
          <Link to={`students?page=${pages.length}`}>
            <span className='page'>{pages.length}</span>
          </Link>
        </span>
      ) : null}
      <Link
        to={`students?page=${currentPage + 1}`}
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
