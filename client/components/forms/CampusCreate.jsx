import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../../redux/actions/createCampus';

const CampusCreate = (props) => {
  const [newCampus, setNewCampus] = useState({
    name: '',
    address: '',
    description: '',
    students: [],
  });
  const [isClicked, setIsClicked] = useState(false);
  const [required, setRequired] = useState(true);

  const initialRender = useRef(true);
  const isEnabled = newCampus.name && newCampus.address;

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (newCampus.name && newCampus.address) {
      props.createCampus(newCampus);
      setNewCampus({ name: '', address: '', description: '' });
      props.isCampusAdded(true);
    }
  }, [isClicked]);
  return (
    <div>
      <h4>Add Campus</h4>
      <form id='campusCreate' encType='multipart/form-data'>
        <label>Campus Name</label>
        <input
          placeholder='required'
          name='campusName'
          value={newCampus.name}
          onChange={(e) => setNewCampus({ ...newCampus, name: e.target.value })}
        />
        <label>Address: </label>
        <input
          placeholder='required'
          name='address'
          value={newCampus.address}
          onChange={(e) =>
            setNewCampus({ ...newCampus, address: e.target.value })
          }
        />
        <label>Description:</label>
        <textarea
          rows='4'
          name='description'
          value={newCampus.description}
          onChange={(e) =>
            setNewCampus({ ...newCampus, description: e.target.value })
          }
        />
        <button
          type='button'
          onClick={() => {
            if (!isEnabled) setRequired(false);
            if (isEnabled) setRequired(true);
            setIsClicked(!isClicked);
          }}
        >
          Add Campus
        </button>
        {!required ? (
          <div>Please fill out all required fields (name and address).</div>
        ) : null}
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

// class CampusCreate extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: '',
//       address: '',
//       description: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(e) {
//     const change = {};
//     change[e.target.name] = e.target.value;
//     this.setState(change);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.createCampus({ ...this.state });
//   }
//   render() {
//     const { name, address, description } = this.state;
//     const { handleSubmit, handleChange } = this;
//     return (
//       <div id='create-campus'>
//         <h4>Add Campus</h4>
//         <form id='add-campus' onSubmit={handleSubmit}>
//           <label htmlFor='name'>Name: </label>
//           <input name='name' value={name} onChange={handleChange} />
//           <label htmlFor='address'>Address: </label>
//           <input name='address' value={address} onChange={handleChange} />
//           <label htmlFor='description'>Description: </label>
//           <input
//             name='description'
//             value={description}
//             onChange={handleChange}
//           />
//           <button type='submit'>Add Campus</button>
//         </form>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   createCampus: (newCampus) => dispatch(createCampus(newCampus)),
// });

// export default connect(null, mapDispatchToProps)(CampusCreate);
