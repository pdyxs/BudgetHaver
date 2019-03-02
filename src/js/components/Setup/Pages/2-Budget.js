import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { overrideBudget } from 'modules/budget';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

import strings, {SetupStrings} from 'modules/localisation';

class Budget extends Component {

  overrideBudget = (evt) => {
    var newBudget = Number(evt.target.value);
    this.props.overrideBudget(newBudget);
  }

  render() {
    var formatter = (amt) => amt ? getCurrencyFormatter(this.props.baseCurrency)(amt, false) : "";
    return (
      <div className="mx-4">
        <div className="lead">{SetupStrings.Budget_Title}</div>
        {SetupStrings.Budget_Texts.map((t, index) =>
          <p className="text-secondary" key={index} dangerouslySetInnerHTML={{__html: t}}></p>
        )}
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
            <span className="input-group-text">{strings.perDay}</span>
          </div>
        </div>

        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            disabled={this.props.budget == 0}
            className="btn btn-primary">{SetupStrings.Budget_Next}
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
