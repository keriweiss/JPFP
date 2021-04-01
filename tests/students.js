const axios = require('axios');

const getStudents = async () => {
  try {
    const students = (await axios.get('/api/students')).data;
    return students;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getStudents;
