import React from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <div id='nav'>
        <Link to='/' id='snuniversityNav'>
          SNUniversity
        </Link>
        <Link to='/' className='navLink' id='homeLink'>
          Home
        </Link>
        <Link to='/students' className='navLink' id='studentsLink'>
          Students
        </Link>
        <Link to='/campuses' className='navLink' id='campusesLink'>
          Campuses
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
