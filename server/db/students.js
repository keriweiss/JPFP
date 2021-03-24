const faker = require('faker');
const { campuses } = require('./campuses');
const axios = require('axios');

const getStudent = async () => {
  const studentImgs = (
    await axios.get('https://randomuser.me/api/?results=500&inc=picture')
  ).data;
  const { name, internet, random } = faker;
  let students = new Array(50).fill(null).map((studentObj) => {
    let img =
      studentImgs.results[
        Math.floor(Math.random() * studentImgs.results.length)
      ];
    return {
      firstName: `${name.firstName()}`,
      lastName: `${name.lastName()}`,
      email: `${internet.email()}`,
      imageUrl: `${img.picture.large}`,
      gpa: `${random.number({ min: 0, max: 4, precision: 0.1 })}`,
      campusId: `${random.number({ min: 1, max: campuses.length })}`,
    };
  });
  return students;
};

module.exports = { getStudent };
