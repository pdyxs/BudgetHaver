import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { setBaseCurrency, currencies } from 'modules/currencies';

import {SetupStrings} from 'modules/localisation';

class Currency extends Component {

  setBaseCurrency = (evt) => {
    var newCurrency = evt.target.value;
    this.props.setBaseCurrency(newCurrency);
  }

  render() {
    return (
      <div className="mx-4">
        <div className="lead">{SetupStrings.Currency_Title}</div>
        {SetupStrings.Currency_Texts.map((t, index) =>
          <p className="text-secondary" key={index}>{t}</p>
        )}
        <div>
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

        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">{SetupStrings.Currency_Next}
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({budget, currencies}) => {
  return {
    ...currencies
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setBaseCurrency: (currency) => {
      dispatch(setBaseCurrency(currency))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Currency);
