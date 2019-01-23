import React, { Component } from "react";
import './App.scss';
import MainDisplay from './MainDisplay';
import Menu from './Menu';
import CurrentPage from './Pages/CurrentPage';
import { connect } from 'react-redux';
import { checkIncome } from 'modules/budget';
import moment from 'moment';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.budget.balance == null &&
      this.props.budget.balance != null)
    {
      this.timerID = setInterval(
        () => this.doCheck(),
        2000
      );
      this.doCheck();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  doCheck() {
    this.props.checkIncome();
  }

  render() {
      return (
        <div className="container">
          <div className="text-center">
            <h1 className="text-small text-muted my-3">
              Budget Haver
            </h1>
            <MainDisplay />
          </div>
          <Menu />
          <CurrentPage />
          <footer className="footer fixed-bottom pb-2">
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
    budget
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkIncome: () => {
      dispatch(checkIncome())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
