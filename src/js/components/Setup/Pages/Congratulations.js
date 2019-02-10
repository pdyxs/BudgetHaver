import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getCurrencyFormatter } from 'modules/currencies';

class Congratulations extends Component {
  render() {
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <div className="mx-4">
        <div className="lead">Congratulations:</div>
        <div className="lead">You are now a Budget Haver!</div>
        <div className="lead mt-3">Your Budget:</div>
        <h3 className="display-5">{formatter(this.props.balance)}<br />
          <small>+{formatter(this.props.budget)}/day</small></h3>
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">Great!
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
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

export default connect(
  mapStateToProps
)(Congratulations);
