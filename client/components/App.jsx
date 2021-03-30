import React, { Component } from 'react';
import Campuses from './Campuses.jsx';
import Students from './Students.jsx';
import { getStudents } from '../redux/actions/getStudents';
import { getCampuses } from '../redux/actions/getCampuses';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SingleCampus from './SingleCampus.jsx';
import SingleStudent from './SingleStudent.jsx';
import Home from './Home.jsx';

class App extends Component {
  componentDidMount() {
    this.props.getStudents();
    this.props.getCampuses();
  }

  render() {
    return (
      <Router>
        <nav>
          <div id='nav'>
            <Link to='/' id='snuniversityNav'>
              SNUniversity
            </Link>
            <Link to='/' className='navLink'>
              Home
            </Link>
            <Link to='/students' className='navLink'>
              Students
            </Link>
            <Link to='/campuses' className='navLink'>
              Campuses
            </Link>
          </div>
        </nav>
        <div id='wrapper'>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/students' component={Students} />
              <Route exact path='/campuses' component={Campuses} />
              <Route path='/campuses/:id' component={SingleCampus} />
              <Route path='/students/:id' component={SingleStudent} />
            </Switch>
          </div>
        </div>
        <div id='address'>
          <span>SNUniversity</span>
          <span>333 Rodeo Drive, Maybe Florida, Maybe Not, USA 90210</span>{' '}
          <span>(212) 212-2121</span>
          <span>admissions@snuniversity.edu</span>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => dispatch(getStudents()),
    getCampuses: () => dispatch(getCampuses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
