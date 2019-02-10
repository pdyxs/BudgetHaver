import Pages from './';
import React, { Component, Fragment } from "react";
import LockableInput from 'components/generics/LockableInput';
import { connect } from 'react-redux';
import { overrideBalance, overrideBudget } from 'modules/budget';
import { Link } from 'react-router-dom';
import { getInCurrency, getCurrencyFormatter, setBaseCurrency, currencies, addFavouriteCurrency, removeFavouriteCurrency } from 'modules/currencies';

class SettingsPage extends Component
{
  constructor() {
    super();
    this.state = {
      addingCurrency: ''
    };
  }

  changeAddableCurrency = (evt) => {
    this.setState({
      addingCurrency: evt.target.value
    });
  }

  addFavouriteCurrency = () => {
    this.props.addFavouriteCurrency(this.state.addingCurrency);
    this.setState({
      addingCurrency: ''
    });
  }

  removeFavouriteCurrency = (currency) => {
    this.props.removeFavouriteCurrency(currency);
  }

  setBalance = (value) => {
    this.props.overrideBalance(Number(value));
  }

  setBudget = (value) => {
    this.props.overrideBudget(Number(value));
  }

  setBaseCurrency = (evt) => {
    var newCurrency = evt.target.value;
    var newBalance = getInCurrency(this.props.balance, this.props.baseCurrency, newCurrency, this.props.exchangeRates);
    var newBudget = getInCurrency(this.props.budget, this.props.baseCurrency, newCurrency, this.props.exchangeRates);
    this.props.setBaseCurrency(newCurrency);
    this.props.overrideBalance(newBalance);
    this.props.overrideBudget(newBudget);
  }

  render() {
    var formatter = (amt) => amt ? getCurrencyFormatter(this.props.baseCurrency, false)(amt, false) : "";
    return (
      <div className="card-body text-left" role="tabpanel" id="settings">
        <div className="mb-3">
          <label>Base Currency</label>
          <select value={this.props.baseCurrency}
            id="currencySelector" className="custom-select"
            onChange={this.setBaseCurrency}>
            {_.map(currencies, currency => (
              <option value={currency.code} key={currency.code}>
                ({currency.code}) {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Active Currencies</label>
          <ul className="list-group">
            {this.props.favouriteCurrencies.map(c => (
              <li className="list-group-item p-2 d-flex justify-content-between align-items-center rounded-bottom-0" key={c}>
                <span>({c}) {currencies[c].name}</span>
                <button className="badge badge-danger badge-pill border-0" onClick={() => this.removeFavouriteCurrency(c)}>-</button>
              </li>
            ))}
          </ul>
          <div className="input-group mb-3">
            <select value={this.state.addingCurrency}
              id="currencySelector" className={`custom-select${this.props.favouriteCurrencies.length == 0 ? '' : ' rounded-top-0 border-top-0'}`}
              onChange={this.changeAddableCurrency}>
              <option disabled value="">Add Currency</option>
              {_.map(_.difference(_.keys(currencies), [this.props.baseCurrency, ...this.props.favouriteCurrencies]), c => (
                <option value={c} key={c}>
                  ({c}) {currencies[c].name}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button disabled={this.state.addingCurrency == ""} onClick={this.addFavouriteCurrency} className={`btn btn-success${this.props.favouriteCurrencies.length == 0 ? '' : ' rounded-top-0'}`} type="button">+</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Daily Budget</label>
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
          <label>Override Balance</label>
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
          <Link className="btn btn-outline-primary w-100" to="/setup">Run Setup Again</Link>
        </div>
      </div>
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
    },
    setBaseCurrency: (currency) => {
      dispatch(setBaseCurrency(currency))
    },
    addFavouriteCurrency: (currency) => {
      dispatch(addFavouriteCurrency(currency))
    },
    removeFavouriteCurrency: (currency) => {
      dispatch(removeFavouriteCurrency(currency))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SettingsPage);
