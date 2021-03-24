import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../../redux/actions/createCampus';

const CampusCreate = (props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      props.createCampus({
        name: name,
        address: address,
        description: description,
      });
      setName('');
      setAddress('');
      setDescription('');
    }
  }, [isClicked]);
  return (
    <div>
      <h4>Add Campus</h4>
      <form id='campusCreate' encType='multipart/form-data'>
        <label>Campus Name:</label>
        <input
          name='campusName'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Address:</label>
        <input
          name='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          rows='4'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type='button'
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Add Campus
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCampus: (newCampus) => dispatch(createCampus(newCampus)),
  };
};

export default connect(null, mapDispatchToProps)(CampusCreate);
