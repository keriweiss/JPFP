const faker = require('faker');
const { campuses } = require('./campuses');
const axios = require('axios');

const getStudent = async () => {
  const studentImgs = (
    await axios.get('https://randomuser.me/api/?results=120&inc=picture')
  ).data;
  const { name, internet, random } = faker;
  let students = new Array(20).fill(null).map((studentObj) => {
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
  console.log(students);
  return students;
};

// if (!students) {
//   const { name, image, internet, random } = faker;
//   students = new Array(10).fill(null).map((studentObj) => ({
//     firstName: `${name.firstName()}`,
//     lastName: `${name.lastName()}`,
//     email: `${internet.email()}`,
//     // imageUrl: `${image.people(100, 100, true)}`,
//     imageUrl: `${test}`,
//     gpa: `${random.number({ min: 0, max: 4, precision: 0.1 })}`,
//     campusId: `${random.number({ min: 1, max: campuses.length })}`,
//   }));
// }

module.exports = { getStudent };
