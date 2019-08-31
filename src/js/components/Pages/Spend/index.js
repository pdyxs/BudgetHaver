import Pages from './';
import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { spendMoney } from 'modules/budget';
import { setSpendCurrency, currencies, getCurrencyFormatter, getInBaseCurrency } from 'modules/currencies';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

import strings from 'modules/localisation';

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

    var startOfToday = moment().startOf('day');
    var spendInLastDay = _.sumBy(
      _.takeRightWhile(this.props.history, h => startOfToday.isBefore(moment(h.date))),
      h => getInBaseCurrency(h.transaction[0].amount, h.transaction[0].currency, this.props)
    ) + baseAmount;
    var dailySpendPercentage = 100 * (1 - spendInLastDay / this.props.budget);
    var dailySpendStyle = 'success';
    if (dailySpendPercentage < 50) dailySpendStyle = 'warning';

    var startOfWeek = moment().subtract(7, 'days').startOf('day');
    var spendInLastWeek = _.sumBy(
      _.takeRightWhile(this.props.history, h => startOfWeek.isBefore(moment(h.date))),
      h => getInBaseCurrency(h.transaction[0].amount, h.transaction[0].currency, this.props)
    ) + baseAmount;
    var weeklySpendPercentage = 100 * (1 - spendInLastWeek / (this.props.budget * 7));
    var weeklySpendStyle = 'success';
    if (weeklySpendPercentage < 50) weeklySpendStyle = 'warning';

    return (
      <div className="card-body text-center">
        {this.props.balance >= 0 &&
          <div className="progress mb-0 rounded-bottom-0 mt-4 progress-sm">
            <div className={`progress-bar bg-${spendStyle}`} role="progressbar" id="spendingBar"
              style={{width: `${percentLeft}%`}}></div>
          </div>
        }
        {this.props.balance < 0 &&
          <div className="progress mb-0 rounded-bottom-0 mt-4 progress-sm">
            <div className={classnames('progress-bar', `bg-${weeklySpendStyle}`)}
              role="progressbar" id="spendingBar"
              style={{width: `${Math.max(0,weeklySpendPercentage)}%`}}></div>
            {weeklySpendPercentage < 0 &&
              <Fragment>
                <div className={classnames('progress-bar')}
                  role="progressbar" id="spendingBar"
                  style={{width: `${Math.max(0,100+weeklySpendPercentage)}%`, background: 'none'}}></div>
                <div className={classnames('progress-bar', 'bg-danger')}
                  role="progressbar" id="spendingBar"
                  style={{width: `${Math.min(100,-weeklySpendPercentage)}%`}}></div>
              </Fragment>
            }
          </div>
        }
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-0">{currencies[this.props.spendCurrency].symbol_native}</span>
          </div>
          <input id="spendMoneyInput" type="number" pattern="-?\d+\.\d*"
            className="form-control rounded-0" placeholder="0.00"
            value={this.state.spendInput} onChange={this.spendInputChanged} />
        </div>
        <div className="progress mb-0 rounded-top-0 mb-3 progress-sm">
          <div className={classnames('progress-bar', `bg-${dailySpendStyle}`)}
            role="progressbar" id="spendingBar"
            style={{width: `${Math.max(0,dailySpendPercentage)}%`}}></div>
          {dailySpendPercentage < 0 &&
            <Fragment>
              <div className={classnames('progress-bar')}
                role="progressbar" id="spendingBar"
                style={{width: `${Math.max(0,100+dailySpendPercentage)}%`, background: 'none'}}></div>
              <div className={classnames('progress-bar', 'bg-danger')}
                role="progressbar" id="spendingBar"
                style={{width: `${Math.min(100,-dailySpendPercentage)}%`}}></div>
            </Fragment>
          }
        </div>
        <div className="mb-3">
          <div className="input-group">
            <select value={this.props.spendCurrency}
              id="currencySelector" className="custom-select"
              onChange={this.setSpendCurrency}>
              {_.map([this.props.baseCurrency, ...this.props.favouriteCurrencies], c => (
                <option value={c} key={c}>
                  ({c}) {currencies[c].name}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <Link className="btn btn-info" role="button" to="/settings/currencies">
                <FontAwesomeIcon icon={['fas', 'plus']} />
              </Link>
            </div>
          </div>
          {this.props.spendCurrency != this.props.baseCurrency &&
            <div id="currencyConverter" className="text-small text-muted">
              = <span id="convertedCurrency">{formatter(baseAmount, false)}</span> {this.props.baseCurrency}
            </div>
          }
        </div>
        <button className={`btn btn-lg btn-${spendStyle}`}
          onClick={this.spend}
          id="spendButton" disabled={!canSpend}>{strings.SpendButton}</button>
      </div>
    );
  }
}

const mapStateToProps = ({budget, currencies, history}) => {
  return {
    ...budget,
    ...currencies,
    history: history.list
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
