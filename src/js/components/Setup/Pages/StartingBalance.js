import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { overrideBalance } from 'modules/budget';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

class StartingBalance extends Component {
  overrideBalanceAmount = (evt) => {
    var newBalance = Number(evt.target.value);
    this.props.overrideBalance(newBalance);
  }

  overrideBalanceDays = (evt) => {
    var newBalance = Number(evt.target.value) * this.props.budget;
    this.props.overrideBalance(newBalance);
  }

  render() {
    var formatter = (amt) => amt ? getCurrencyFormatter(this.props.baseCurrency, false)(amt, false) : "";
    var days = this.props.balance / this.props.budget;
    return (
      <div className="mx-4">
        <div className="lead">3. How much do you want to start with?</div>
        <div className="text-secondary">
          <p>
            This is just a starting balance.
          </p>
          <p>
            Generally, I'd recommend you start with 4-6 days worth, just as a buffer while you get used to the app
          </p>
        </div>
        <div className="input-group">
          <input className="form-control"
            type="number"
            placeholder="0"
            value={days > 0 ? days : ""}
            onChange={this.overrideBalanceDays}
            />
          <div className="input-group-append">
            <span className="input-group-text">days</span>
          </div>
        </div>
        <div className="my-2">OR</div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{currencies[this.props.baseCurrency].symbol_native}</span>
          </div>
          <input className="form-control"
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={this.props.balance ? formatter(this.props.balance) : ""}
            onChange={this.overrideBalanceAmount}
            />
        </div>

        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            disabled={this.props.balance == 0}
            className="btn btn-primary">Next
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({budget, currencies}) => {
  return {
    ...currencies,
    ...budget
  };
}

const mapDispatchToProps = dispatch => {
  return {
    overrideBalance: (budget) => {
      dispatch(overrideBalance(budget))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(StartingBalance);
