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
import { startSession, endSession } from 'modules/navigation';
import classnames from 'classnames';

import Interrupts from 'modules/interrupts/Interrupts';

import { isUnlocked } from 'modules/unlockables';

import BasicStrings from 'modules/localisation';

class App extends Component {
  componentDidMount() {
    this.props.startSession();
    this.setupBeforeUnloadListener();
  }

  componentDidMount() {
    if (this.props) {
      this.doCheck();
      this.timerID = setInterval(
        () => this.doCheck(),
        5000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  doBeforeUnload = () => {
    this.props.endSession();
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.doBeforeUnload();
    });
  };

  doCheck() {
    if (this.props.balance)
    {
      this.props.checkIncome();
    }
  }

  render() {
    return (
      <div className={
          classnames(
            {scrollable: !this.props.navigation.areStarsOpen},
            "container")}>
        <Switch>
          <Route path="/setup" exact component={Setup} />
          <Route>
            <Fragment>
              <div className="text-center">
                <h1 className="text-small my-3">
                  {BasicStrings.AppTitle}
                </h1>
                <MainDisplay />
              </div>
              <Menu />
              <CurrentPage />
              {isUnlocked.stars(this.props) &&
                <Stars />
              }
              <Interrupts />
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

const mapStateToProps = ({budget, achievements, interrupts, navigation}) => {
  return {
    ...budget,
    achievements,
    interrupts,
    navigation
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkIncome: () => dispatch(checkIncome()),
    startSession: () => dispatch(startSession()),
    endSession: () => dispatch(endSession())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
