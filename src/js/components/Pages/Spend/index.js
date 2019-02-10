import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { spendMoney } from 'modules/budget';
import { setSpendCurrency, currencies, getCurrencyFormatter, getInBaseCurrency } from 'modules/currencies';

class SpendPage extends Component {
  constructor() {
    super();
    this.state = {
      spendInput: ''
    };
  }

  spendInputChanged = (evt) => {
    var number = Number(evt.target.value);
    this.setState({
      spendInput: number != 0 ? number : ''
    });
  }

  spend = () => {
    this.props.spend(this.state.spendInput);
    this.setState({
      spendInput : ''
    });
  }

  setSpendCurrency = (evt) => {
    this.props.setSpendCurrency(evt.target.value);
  }

  getInBaseCurrency = (amount) => {
    return getInBaseCurrency(amount, this.props.spendCurrency, this.props);
  }

  render() {
    var baseAmount = this.getInBaseCurrency(this.state.spendInput);
    var percentLeft = this.props.balance > 0 ? Math.max(0, 100 * (1 - baseAmount / this.props.balance)) : 0;
    var canSpend = this.state.spendInput != 0;
    var spendStyle = percentLeft > 50 ? 'success' :
                     percentLeft > 0 ? 'warning' :
                                        'danger';
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <div className="card-body text-center" role="tabpanel" id="spend" aria-labelledby="spend-tab">
        <div className="input-group rounded-bottom-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input id="spendMoneyInput" type="number" pattern="-?\d+\.\d*"
            className="form-control" placeholder="0.00"
            value={this.state.spendInput} onChange={this.spendInputChanged} />
        </div>
        <div className="progress mb-2 rounded-top-0">
          <div className={`progress-bar bg-${spendStyle}`} role="progressbar" id="spendingBar"
            style={{width: `${percentLeft}%`}}></div>
        </div>
        <div className="mb-3">
          <select value={this.props.spendCurrency}
            id="currencySelector" className="custom-select"
            onChange={this.setSpendCurrency}>
            {_.map([this.props.baseCurrency, ...this.props.favouriteCurrencies], c => (
              <option value={c} key={c}>
                ({c}) {currencies[c].name}
              </option>
            ))}
          </select>
          {this.props.spendCurrency != this.props.baseCurrency &&
            <div id="currencyConverter" className="text-small text-muted">
              = <span id="convertedCurrency">{formatter(baseAmount, false)}</span> {this.props.baseCurrency}
            </div>
          }
        </div>
        <button className={`btn btn-lg btn-${spendStyle}`}
          onClick={this.spend}
          id="spendButton" disabled={!canSpend}>Spend Money!</button>
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    spend: (amount) => {
      dispatch(spendMoney(amount))
    },
    setSpendCurrency: (currency) => {
      dispatch(setSpendCurrency(currency))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SpendPage);
