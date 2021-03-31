import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id='notFound'>
      <p>404</p>
      <p>Page Not Found</p>
      <Link to='/'>Return Home</Link>
    </div>
  );
};

export default PageNotFound;
