import React from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <div id='nav'>
        <Link to='/' id='snuniversityNav'>
          SNUniversity
        </Link>
        <Link to='/' className='navLink'>
          Home
        </Link>
        <Link to='/students' className='navLink'>
          Students
        </Link>
        <Link to='/campuses' className='navLink'>
          Campuses
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
