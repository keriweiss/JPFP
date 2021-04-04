import 'jsdom-global/register';

const chai = require('chai');
const { expect } = require('chai');
const axios = require('axios');
const supertest = require('supertest');
const app = require('../server/server');

const { db, Campuses, Students } = require('../server/db/db');

beforeEach(async () => {
  await db.sync({ force: true });
});
// afterEach(() => db.sync({ force: true }));
after(() => db.close());

// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter, Link } from 'react-router';
import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
enzyme.configure({ adapter: new Adapter() });

//import components
import { default as StudentList } from '../client/components/studentViews/Students';
import { default as CampusList } from '../client/components/campusViews/Campuses.jsx';
import Nav from '../client/components/Nav';

// import reducers
import rootReducer from '../client/redux/reducers/rootReducer';
import studentsReducer from '../client/redux/reducers/studentsReducer';
import campusesReducer from '../client/redux/reducers/campusesReducer';

// import { render } from '@testing-library/react';

//mock store
import configureStore from 'redux-mock-store';
import { GET_CAMPUSES } from '../client/redux/actions/getCampuses';
import { GET_STUDENTS } from '../client/redux/actions/getStudents';
const middlewares = [];
const mockStore = configureStore(middlewares);

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
      const createdStudents = await Students.bulkCreate(students);
      storedStudents = createdStudents.map((student) => student.dataValues);
    });
    describe('Student Get request', () => {
      it('responds with all students', async () => {
        const response = (await supertest(app).get('/api/students')).body;
        expect(response).to.have.length(2);
        expect(response[0].firstName).to.equal(storedStudents[0].firstName);
      });
    });
    describe('student :id get request', () => {
      it('responds with single student by id', async () => {
        const response = (await supertest(app).get('/api/students/2')).body;
        expect(response.firstName).to.equal('Bill');
      });
    });
  });
});

describe('Front End', () => {
  const studentsArr = [
    {
      firstName: 'Shelley',
      lastName: 'Duvall',
      email: 'theatretheatre@gmail.com',
      gpa: 3,
    },
    {
      firstName: 'Barack',
      lastName: 'Obama',
      email: 'bigheart@email.com',
      gpa: 4.0,
    },
    {
      firstName: 'Mandy',
      lastName: 'Patinken',
      email: 'anigomontoya@tpb.com',
      gpa: 2.5,
    },
  ];
  const campusArr = [
    {
      name: 'Dubai',
      address: 'Obviously somewhere in Dubai',
      students: [],
    },
    {
      name: 'Waikiki',
      address: 'Over the rainbow',
      students: [],
    },
    {
      name: 'NYC',
      address: 'Big Apple',
      students: [],
    },
    {
      name: 'Eden',
      address: 'Garden Of Eden',
      students: [],
    },
  ];

  describe('React', () => {
    describe('Students component', () => {
      it('renders no students if passed an empty array', () => {
        const store = mockStore({
          students: [],
        });
        const wrapper = shallow(
          <Provider store={store}>
            <StudentList />
          </Provider>
        );

        expect(wrapper.find('p')).to.have.length(0);
      });
      it('renders students for students passed in as props', async () => {
        const store = mockStore({
          students: studentsArr,
          campuses: [],
        });
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter>
              <StudentList />
            </MemoryRouter>
          </Provider>
        );
        const mrouter = wrapper.find(MemoryRouter);
        const studentList = mrouter.find(StudentList);
        const studentContainers = studentList.find('p');
        expect(studentContainers).to.have.length(3);
      });
    });

    describe('Campuses Components', () => {
      it('renders no campuses if passed an empty array', () => {
        const store = mockStore({
          campuses: [],
        });
        const wrapper = shallow(
          <Provider store={store}>
            <CampusList campuses={[]} />
          </Provider>
        );
        expect(wrapper.find('p')).to.have.length(0);
      });
      it('renders campuses for campuses passed in as props', () => {
        const store = mockStore({
          campuses: campusArr,
        });
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter>
              <CampusList campuses={campusArr} />
            </MemoryRouter>
          </Provider>
        );
        const mrouter = wrapper.find(MemoryRouter);
        const campusList = mrouter.find(CampusList);
        const campusContainers = campusList.find('p');
        expect(campusContainers).to.have.length(4);
      });
    });
  });

  describe('redux reducers', () => {
    describe('campuses', () => {
      it('returns the initial state by default', () => {
        expect(campusesReducer(undefined, {})).to.deep.equal([]);
      });
      it('returns a new state with the updated campuses', () => {
        const newState = campusesReducer([], {
          type: GET_CAMPUSES,
          campuses: campusArr,
        });
        expect(newState).to.deep.equal(campusArr);
      });
    });

    describe('students', () => {
      it('returns the initial state by default', () => {
        expect(studentsReducer(undefined, {})).to.deep.equal([]);
      });
      it('returns a new state with the updated students', () => {
        const newState = studentsReducer([], {
          type: GET_STUDENTS,
          students: studentsArr,
        });
        expect(newState).to.deep.equal(studentsArr);
      });
    });
  });

  describe('navigation', () => {
    describe('nav bar navigates home, campuses, and students', () => {
      it('navigates home', () => {
        const wrapper = shallow(<Nav />);
        expect(wrapper.find('Link').filter('#homeLink').props().to).to.equal(
          '/'
        );
      });
      it('navigates to campuses', () => {
        const wrapper = shallow(<Nav />);
        expect(
          wrapper.find('Link').filter('#campusesLink').props().to
        ).to.equal('/campuses');
      });
      it('navigates home', () => {
        const wrapper = shallow(<Nav />);
        expect(
          wrapper.find('Link').filter('#studentsLink').props().to
        ).to.equal('/students');
      });
    });
  });
});
