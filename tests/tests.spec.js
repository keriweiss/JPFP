const chai = require('chai');
const { expect } = require('chai');
const axios = require('axios');

// let app;
const app = require('supertest')(_app);

const { db, Campuses, Students } = require('../server/db/db');

beforeEach(async () => {
  // app = require('../server/server');
  // await db.sync({ force: true });
});

// import React from 'react';
// const StudentsComp = require('../client/components/Students.jsx');
// import Campuses from '../client/components/Campuses.jsx';

describe('Back End', () => {
  describe('Sequelize', () => {
    describe('Students model', () => {
      describe('Validations', () => {
        it('requires first name and last name', async () => {
          const newStudent = {
            firstName: '',
            lastName: '',
            email: 'rodneydangerfield@gmail.com',
          };
          try {
            await Students.create(newStudent);
            throw Error(
              'student create should have failed without first and/or last name'
            );
          } catch (err) {
            expect(err.message).to.contain(
              'notEmpty on firstName' && 'notEmpty on lastName'
            );
          }
        });
        it('requires email', async () => {
          const newStudent = {
            firstName: 'Rodney',
            lastName: 'Dangerfield',
            email: '',
          };
          try {
            await Students.create(newStudent);
            throw Error('student create should have failed with empty email');
          } catch (err) {
            expect(err.message).to.contain('notEmpty on email');
          }
        });
        it('email must be a valid email', async () => {
          const newStudent = {
            firstName: 'Rodney',
            lastName: 'Dangerfield',
            email: 'rodneydangerfield',
          };
          try {
            await Students.create(newStudent);
            throw Error('create should have failed with invalid email address');
          } catch (err) {
            expect(err.message).to.contain(
              'Validation isEmail on email failed'
            );
          }
        });
      });
    });
    describe('Campus Model', () => {
      describe('Validations', () => {
        it('requires name', async () => {
          const newCampus = {
            address: '22 Wallaby Way, Australia',
          };
          try {
            await Campuses.create(newCampus);
            throw Error('campus create should have failed without name');
          } catch (err) {
            expect(err.message).to.contain('cannot be null');
          }
        });
        it('requires address', async () => {
          const newCampus = {
            name: 'Not My Campus',
          };
          try {
            await Campuses.create(newCampus);
            throw Error('campus create should have failed without address');
          } catch (err) {
            expect(err.message).to.contain('cannot be null');
          }
        });
      });
    });
  });

  describe('Express', () => {
    describe('Student Get request', () => {
      let storedStudents;
      const students = [
        {
          firstName: 'Jason',
          lastName: 'Alexander',
          email: 'jayal@email.com',
          gpa: '1.0',
        },
        {
          firstName: 'Bill',
          lastName: 'Withers',
          email: 'billyW@email.com',
          gpa: '4.0',
        },
      ];
      beforeEach(async () => {
        // await db.sync({ force: true });
        try {
          const createdStudents = await Students.bulkCreate(students);
          storedStudents = createdStudents.map((student) => student.dataValues);
        } catch (err) {
          console.log(err);
        }
        // console.log(createdStudents);
        // storedStudents = await Students.findAll();
      });

      it('responds with all students', async () => {
        try {
          const response = await app.get('/api/students');
          // console.log(response);
          expect(response).to.have.length(0);
          expect(response[0].firstName).to.equal(storedStudents[0].firstName);
        } catch (err) {
          console.log(err);
        }
        // const response = await getStudents();
        // const response = (await axios.get('/api/students')).data;
        // const response = (
        //   await request.get('http://localhost:1234/api/students')
        // ).data;
        // const response = await app.get('/api/students');

        // try {
        //   // expect(response.length).to.equal(allStudents.length);
        // } catch (err) {
        //   throw Error(err);
        // }
      });
    });
  });
});

// describe('Front End', () => {
//   describe('React', () => {
//     describe('Students component', () => {
//       const studentComponent = <StudentsComp students={[]} />;
//       expect(studentComponent.find('studentWithButton')).to.have.length(0);
//     });
//   });
// });
