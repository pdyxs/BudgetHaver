import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

class MainDisplay extends Component {

  render() {
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <Fragment>
        <div className="card text-light bg-info">
          <div className="card-header">
            <h3 className="card-title mb-0">You have</h3>
          </div>
          <div className="card-body">
            <h2 className="display-3">
              <span className="small">{currencies[this.props.baseCurrency].symbol_native}</span>
              {formatter(this.props.balance, false)}
            </h2>
          </div>
        </div>
        <div className="text-small text-muted">
          You get {formatter(this.props.budget)} per day
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({budget, currencies}) => {
  return {
    ...budget,
    ...currencies
  }
}

export default connect(mapStateToProps)(MainDisplay);
