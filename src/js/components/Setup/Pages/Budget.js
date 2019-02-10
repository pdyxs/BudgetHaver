import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { overrideBudget } from 'modules/budget';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

class Budget extends Component {

  overrideBudget = (evt) => {
    var newBudget = Number(evt.target.value);
    this.props.overrideBudget(newBudget);
  }

  render() {
    var formatter = (amt) => amt ? getCurrencyFormatter(this.props.baseCurrency)(amt, false) : "";
    return (
      <div className="mx-4">
        <div className="lead">2. How much do you spend each day?</div>
        <div className="text-secondary">
          <p>
            Ignoring any recurring costs, how much do you <i>think</i> you spend?
          </p>
          <p>
            Don't worry too much about this number being right, you can always change
            it later if you're not happy with it
          </p>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{currencies[this.props.baseCurrency].symbol_native}</span>
          </div>
          <input className="form-control"
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={this.props.budget ? formatter(this.props.budget) : ""}
            onChange={this.overrideBudget}
            />
          <div className="input-group-append">
            <span className="input-group-text">per day</span>
          </div>
        </div>

        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            disabled={this.props.budget == 0}
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
    overrideBudget: (budget) => {
      dispatch(overrideBudget(budget))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Budget);
