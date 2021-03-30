import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Pagination = ({
  students,
  studentsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(students.length / studentsPerPage));
  }, [students]);

  const pages = new Array(totalPages).fill('');

  return (
    <div id='pages'>
      {pages.map((page, idx) => (
        <Link
          to={`students?page=${idx + 1}`}
          onClick={() => setCurrentPage(idx + 1)}
        >
          <div className='page'>{idx + 1}</div>
        </Link>
      ))}
      <Link
        to={`students?page=${currentPage + 1}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        >
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, null)(Pagination);
