import React, { Component } from 'react';
import Campuses from './Campuses.jsx';
import Students from './Students.jsx';
import { getStudents } from '../redux/actions/getStudents';
import { getCampuses } from '../redux/actions/getCampuses';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SingleCampus from './SingleCampus.jsx';
import SingleStudent from './SingleStudent.jsx';

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
            <Link to='/students'>Students</Link>
            <Link to='/campuses'>Campuses</Link>
          </div>
        </nav>
        <div>
          <Switch>
            <Route exact path='/' component={Students} />
            <Route exact path='/students' component={Students} />
            <Route exact path='/campuses' component={Campuses} />
            <Route path='/campuses/:id' component={SingleCampus} />
            <Route path='/students/:id' component={SingleStudent} />
          </Switch>
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
