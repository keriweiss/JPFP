import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../../redux/actions/updateCampus';

const CampusUpdate = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [initialRender, isInitialRender] = useState(true);
  const [inputValues, setInputValue] = useState({
    name: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    console.log(inputValues);
    if (!initialRender) {
      props.updateCampus(inputValues);
      setInputValue({ name: '', address: '', description: '' });
    }
  }, [isClicked]);

  useEffect(() => {
    if (!initialRender) {
      setInputValue({
        name: props.campus.name,
        address: props.campus.address,
        description: props.campus.description,
      });
    }
  }, [props]);

  useEffect(() => {
    isInitialRender(false);
  }, []);

  return (
    <form id='campusUpdate'>
      <label>Name: </label>
      <input
        name='name'
        value={inputValues.name}
        placeholder={props.campus.name}
        onChange={(e) => {
          setInputValue({ ...inputValues, name: e.target.value });
        }}
      />
      <label>Address:</label>
      <input
        name='address'
        value={inputValues.address}
        placeholder={props.campus.address}
        onChange={(e) => {
          setInputValue({ ...inputValues, address: e.target.value });
        }}
      />
      <label>Description:</label>
      <textarea
        rows='4'
        name='description'
        value={inputValues.description}
        placeholder={props.campus.description}
        onChange={(e) => {
          setInputValue({ ...inputValues, description: e.target.value });
        }}
      />
      <button
        type='button'
        onClick={() => {
          setIsClicked(!isClicked);
          setInputValue({ ...inputValues, id: props.campus.id });
        }}
      >
        Update Campus
      </button>
    </form>
  );
};

const mapStateToProps = ({ campus }) => {
  return { campus: campus };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusUpdate);
