import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Hashrouter as Router, Link, Route, Switch } from 'react-router-dom';
import { getSingleCampus } from '../redux/actions/getSingleCampus';

const Campus = (props) => {
  useEffect(() => {
    props.getSingleCampus(props.match.params.id);
  }, []);
  const { name, imageUrl, address, description } = props.campus;
  const students = props.campus.students || [];
  return (
    <div className='singleCampusView'>
      <p>
        <img src={imageUrl} />
      </p>
      <p>{name}</p>
      <p>{address}</p>
      <p>{description}</p>
      {students.length ? (
        <div>
          STUDENTS:
          {students.map((student) => (
            <Link to={`/students/${student.id}`}>
              <ul key={`student${student.id}`}>
                {student.firstName} {student.lastName}
              </ul>
            </Link>
          ))}
        </div>
      ) : (
        <p id='campusClosed'>
          Campus has been condemned and is currently unsafe. Campus will reopen
          in 2030.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleCampus: (campusId) => dispatch(getSingleCampus(campusId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
