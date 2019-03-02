import Pages from './';
import React, { Component, Fragment } from "react";
import LockableInput from 'components/generics/LockableInput';
import { connect } from 'react-redux';
import { overrideBalance, overrideBudget } from 'modules/budget';
import { Link } from 'react-router-dom';
import { getInCurrency, getCurrencyFormatter, setBaseCurrency, currencies, addFavouriteCurrency, removeFavouriteCurrency } from 'modules/currencies';

import strings from 'modules/localisation';

class SetupSettings extends Component
{
  setBalance = (value) => {
    this.props.overrideBalance(Number(value));
  }

  setBudget = (value) => {
    this.props.overrideBudget(Number(value));
  }

  render() {
    var formatter = (amt) => amt ? getCurrencyFormatter(this.props.baseCurrency, false)(amt, false) : "";
    return (
      <Fragment>
        <div className="form-group">
          <label>{strings.Settings_Budget}</label>
          <LockableInput
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={formatter(this.props.budget) || 0}
            onSubmit={this.setBudget}
            prepend={(
              <span className="input-group-text">{currencies[this.props.baseCurrency].symbol_native}</span>
            )}>
          </LockableInput>
        </div>

        <div className="form-group">
          <label>{strings.Settings_Balance}</label>
          <LockableInput
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={formatter(this.props.balance) || 0}
            onSubmit={this.setBalance}
            prepend={(
              <span className="input-group-text">{currencies[this.props.baseCurrency].symbol_native}</span>
            )}>
          </LockableInput>
        </div>

        <div className="w-100">
          <Link className="btn btn-outline-primary w-100" to="/setup">{strings.Settings_RunSetup}</Link>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({budget, currencies}) => {
  return {
    ...budget,
    ...currencies
  };
}

const mapDispatchToProps = dispatch => {
  return {
    overrideBalance: (amount) => {
      dispatch(overrideBalance(amount))
    },
    overrideBudget: (amount) => {
      dispatch(overrideBudget(amount))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SetupSettings);
