import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Campuses = (props) => {
  // return <div>hi</div>;
  return (
    <div>
      Campuses:
      {props.campuses.map((campus) => (
        <div id='campus' key={campus.id}>
          <Link to={`campuses/${campus.id}`}>
            <p>{campus.name}</p>
            <img src={campus.imageUrl}></img>
          </Link>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  campuses: state.campuses,
});

export default connect(mapStateToProps)(Campuses);
