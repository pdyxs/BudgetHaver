import React, { Component, Fragment } from "react";
import './App.scss';
import MainDisplay from './MainDisplay';
import Menu from './Menu';
import CurrentPage from './Pages/CurrentPage';
import { connect } from 'react-redux';
import { checkIncome } from 'modules/budget';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Setup from './Setup';
import Stars from './Stars';

class App extends Component {
  componentDidMount() {
    this.timerID = setInterval(
      () => this.doCheck(),
      5000
    );
    this.doCheck();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  doCheck() {
    if (this.props.balance)
    {
      this.props.checkIncome();
    }
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/setup" exact component={Setup} />
          <Route>
            <Fragment>
              <div className="text-center">
                <h1 className="text-small text-muted my-3">
                  Budget Haver
                </h1>
                <MainDisplay />
              </div>
              <Menu />
              <CurrentPage />
              <Stars />
            </Fragment>
          </Route>
        </Switch>
        <div className="mb-4 pb-2"></div>
        <footer className="footer fixed-bottom pb-1 bg-white-50">
          <div className="container text-right">
            <span className="small text-muted">v{APP_VERSION_NUMBER}, built on {BUILD_DATE} at {BUILD_TIMESTAMP} (UTC)</span>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({budget}) => {
  return {
    ...budget
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkIncome: () => {
      dispatch(checkIncome())
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
