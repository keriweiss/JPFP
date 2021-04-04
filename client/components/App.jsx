import React, { Component } from 'react';
import Campuses from './campusViews/Campuses.jsx';
import Students from './studentViews/Students.jsx';
import { getStudents } from '../redux/actions/getStudents';
import { getCampuses } from '../redux/actions/getCampuses';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SingleCampus from './campusViews/SingleCampus.jsx';
import SingleStudent from './studentViews/SingleStudent.jsx';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Loading from './Loading.jsx';
import PageNotFound from './PageNotFound.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    await this.props.getStudents();
    await this.props.getCampuses();
    this.setState({
      ...this.state,
      loading: false,
    });
  }

  render() {
    return (
      <Router>
        <Nav />
        <div id='wrapper'>
          <div>
            {this.state.loading ? (
              <Loading />
            ) : (
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/students' component={Students} />
                <Route exact path='/campuses' component={Campuses} />
                <Route eaxt path='/campuses/:id' component={SingleCampus} />
                <Route exact path='/students/:id' component={SingleStudent} />
                <Route path='*' component={PageNotFound} />
              </Switch>
            )}
          </div>
        </div>
        <Footer />
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
