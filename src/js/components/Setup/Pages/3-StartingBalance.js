import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { overrideBalance } from 'modules/budget';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

import strings, {SetupStrings} from 'modules/localisation';

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
        <div className="lead">{SetupStrings.StartingBalance_Title}</div>
        {SetupStrings.StartingBalance_Texts.map((t, index) =>
          <p className="text-secondary" key={index} dangerouslySetInnerHTML={{__html: t}}></p>
        )}
        <div className="input-group">
          <input className="form-control"
            type="number"
            placeholder="0"
            value={days > 0 ? days : ""}
            onChange={this.overrideBalanceDays}
            />
          <div className="input-group-append">
            <span className="input-group-text">{strings.days}</span>
          </div>
        </div>
        <div className="my-2">{strings.or.toUpperCase()}</div>
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
            className="btn btn-primary">{SetupStrings.StartingBalance_Next}
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
