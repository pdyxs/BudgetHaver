import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getCurrencyFormatter } from 'modules/currencies';

class Rules extends Component {
  render() {
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <div className="mx-4">
        <div className="lead">Your Balance:</div>
        <h3 className="display-5">{formatter(this.props.balance)}</h3>
        <div className="text-secondary">
          <p>There are only 3 rules for your budget:</p>
          <ol>
            <li>Treat this number as the amount of money you actually have.</li>
            <li>Whenever you spend money that's not recurring, log it in this app</li>
            <li>Be kind to yourself. Change your daily budget when it makes sense to do so</li>
          </ol>
        </div>
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">Let's Start!
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
)(Rules);
