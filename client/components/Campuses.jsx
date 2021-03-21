import React from 'react';
import { connect } from 'react-redux';

const Campuses = (props) => {
  // return <div>hi</div>;
  return (
    <div>
      Campuses:
      {props.campuses.map((campus) => (
        <div id='campus' key={campus.id}>
          <p>{campus.name}</p>
          <img src={campus.imageUrl}></img>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  campuses: state.campuses,
});

export default connect(mapStateToProps)(Campuses);
